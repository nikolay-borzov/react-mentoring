const merge = require('webpack-merge')
const webpack = require('webpack')
const common = require('./webpack.common.js')()

module.exports = merge(common, {
  mode: 'development',

  entry: {
    main: [common.entry.main, 'webpack-hot-middleware/client']
  },

  devtool: 'inline-source-map',

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
})
