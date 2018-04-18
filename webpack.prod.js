const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const common = require('./webpack.common.js')()

const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const srcRoot = path.resolve(__dirname, 'src')

module.exports = merge(common, {
  mode: 'production',

  devtool: 'source-map',

  plugins: [
    new CleanWebpackPlugin([common.output.path]),

    new UglifyJSPlugin({
      sourceMap: true
    }),

    // TODO: Remove. Webpack sets it automatically from `mode`
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    new ExtractTextPlugin('styles.css')
  ],

  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },

  module: {
    rules: [
      // Tree Shaking
      {
        include: [/node_modules/, path.join(srcRoot, '**/*.js')],
        sideEffects: false
      },
      // CSS
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  }
})
