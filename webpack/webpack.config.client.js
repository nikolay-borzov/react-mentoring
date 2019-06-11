const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const common = require('./webpack.config.common')
const baseConfig = common.getConfig()

const isDevelopment = common.isDevelopment

const entry = [
  'core-js/stable',
  'regenerator-runtime/runtime',
  'url-search-params-polyfill',
  './src/client.jsx'
]

const fileLoaderFilename = isDevelopment
  ? '[name].[ext]'
  : '[name].[ext]?v=[hash:7]'

const plugins = [
  new MiniCssExtractPlugin({
    filename: '[name].css?v=[chunkhash:7]'
  }),
  new webpack.DefinePlugin({
    IS_SERVER: false
  })
]

if (isDevelopment) {
  plugins.push(new webpack.HotModuleReplacementPlugin())
} else {
  plugins.push(
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: []
    }),
    new UglifyJSPlugin({
      sourceMap: true
    })
  )
}

const rules = [
  // Images
  {
    test: /\.(png|svg|jpg|gif)$/,
    loader: 'file-loader',
    options: {
      name: fileLoaderFilename
    }
  },
  // Fonts
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    loader: 'file-loader',
    options: {
      name: fileLoaderFilename
    }
  }
]

const cssRule = {
  test: /\.css$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: { importLoaders: 1, sourceMap: true }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        config: {
          // Pass mode through context
          // https://github.com/postcss/postcss-loader/issues/353#issuecomment-386756190
          ctx: { mode: baseConfig.mode }
        }
      }
    }
  ]
}

if (isDevelopment) {
  rules.push(cssRule)
} else {
  rules.push(
    // CSS
    {
      test: /\.css$/,
      // Exclude 'style-loader'
      use: [MiniCssExtractPlugin.loader].concat(cssRule.use.slice(1))
    },
    // Tree Shaking
    {
      include: [/node_modules/, path.join(common.srcRoot, '**/*.js')],
      sideEffects: false
    }
  )
}

module.exports = merge(baseConfig, {
  name: 'client',
  target: 'web',

  entry: {
    client: isDevelopment
      ? entry.concat([
          'react-hot-loader/patch',
          'webpack-hot-middleware/client?quiet=true'
        ])
      : entry
  },

  devtool: isDevelopment ? 'inline-source-map' : 'source-map',

  plugins,

  output: {
    filename: isDevelopment ? '[name].js' : '[name].js?v=[chunkhash:7]'
  },

  // https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
  optimization: {
    runtimeChunk: 'single', // Separate chunk for webpack runtime
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      minChunks: 2,
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /node_modules/,
          priority: 2,
          enforce: true
        },
        commons: {
          name: 'commons',
          priority: 1,
          reuseExistingChunk: true
        }
      }
    }
  },

  module: {
    rules
  }
})
