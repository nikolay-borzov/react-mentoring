const merge = require('webpack-merge')
const webpack = require('webpack')

const common = require('./webpack.common.js')

const baseConfig = common.getConfig()

const fileLoaderFilename = '[name].[ext]'

// Main entry is the last item in the array
const mainEntry = baseConfig.entry.main
mainEntry.splice(
  -1,
  0,
  'react-hot-loader/patch',
  'webpack-hot-middleware/client?quiet=true'
)

// Don't use [chunkhash] or [hash] for development
// https://github.com/webpack/webpack-dev-server/issues/377#issuecomment-241258405
module.exports = merge.smartStrategy({
  'entry.main': 'replace'
})(baseConfig, {
  mode: 'development',
  /* 'webpack-hot-middleware/client' */
  entry: {
    main: mainEntry
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
