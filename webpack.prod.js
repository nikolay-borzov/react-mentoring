const path = require('path')
const merge = require('webpack-merge')

// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const common = require('./webpack.common.js')

const srcRoot = path.resolve(__dirname, 'src')

const fileLoaderFilename = '[name].[ext]?v=[hash:7]'

const cssRule = common.getCssRule()
cssRule.use.unshift(MiniCssExtractPlugin.loader)

module.exports = merge(common.getConfig(), {
  // Webpack 4 sets process.env.NODE_ENV='production' automatically
  mode: 'production',

  devtool: 'source-map',

  plugins: [
    // new ExtractTextPlugin('[name].css?v=[chunkhash:7]'),
    new MiniCssExtractPlugin({
      filename: '[name].css?v=[contenthash:7]',
      chunkFilename: '[name].css?v=[contenthash:7]'
    }),
    new UglifyJSPlugin({
      sourceMap: true
    })
  ],

  output: {
    filename: '[name].js?v=[chunkhash:7]'
  },

  module: {
    rules: [
      // CSS
      cssRule,
      /* {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          // Exclude 'style-loader'
          use: common.cssRule.use.slice(1)
        })
      }, */
      // Tree Shaking
      {
        include: [/node_modules/, path.join(srcRoot, '**/*.js')],
        sideEffects: false
      },
      // Images
      common.getImageRule(fileLoaderFilename),
      // Fonts
      common.getFontRule(fileLoaderFilename)
    ]
  }
})
