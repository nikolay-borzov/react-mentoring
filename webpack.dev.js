const merge = require('webpack-merge')
const webpack = require('webpack')

const common = require('./webpack.common.js')

const baseConfig = common.getConfig()

const fileLoaderFilename = '[name].[ext]'

// Don't use [chunkhash] or [hash] for development
// https://github.com/webpack/webpack-dev-server/issues/377#issuecomment-241258405
module.exports = merge(baseConfig, {
  mode: 'development',

  entry: {
    main: [baseConfig.entry.main, 'webpack-hot-middleware/client']
  },

  devtool: 'inline-source-map',

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],

  output: {
    filename: '[name].js'
  },

  module: {
    rules: [
      common.cssRule,
      // Images
      common.getImageRule(fileLoaderFilename),
      // Fonts
      common.getFontRule(fileLoaderFilename)
    ]
  }
})
