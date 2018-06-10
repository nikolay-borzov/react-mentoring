const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')

const common = require('./webpack.config.common')

module.exports = merge(common.getConfig(), {
  name: 'server',
  target: 'node',

  entry: ['babel-polyfill', './src/server-renderer.js'],

  externals: [nodeExternals()],

  plugins: [
    new webpack.DefinePlugin({
      IS_SERVER: true
    })
  ],

  output: {
    filename: 'server-renderer.js',
    library: 'app',
    libraryTarget: 'commonjs2'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        include: common.srcRoot,
        use: [
          // It doesn't embed CSS but only exports the identifier mappings.
          'css-loader/locals'
        ]
      }
    ]
  }
})
