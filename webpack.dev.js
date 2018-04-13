const merge = require('webpack-merge')
const webpack = require('webpack')
const common = require('./webpack.common.js')()

module.exports = merge(common, {
  mode: 'development',

  entry: {
    index: [common.entry.index, 'webpack-hot-middleware/client']
  },

  devtool: 'inline-source-map',

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],

  module: {
    rules: [
      // CSS
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
})
