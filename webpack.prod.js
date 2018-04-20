const path = require('path')
const merge = require('webpack-merge')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const common = require('./webpack.common.js')()

const srcRoot = path.resolve(__dirname, 'src')

module.exports = merge(common, {
  // Webpack 4 sets process.env.NODE_ENV='production' automatically
  mode: 'production',

  devtool: 'source-map',

  plugins: [
    new CleanWebpackPlugin([common.output.path]),

    new UglifyJSPlugin({
      sourceMap: true
    })
  ],

  module: {
    rules: [
      // Tree Shaking
      {
        include: [/node_modules/, path.join(srcRoot, '**/*.js')],
        sideEffects: false
      }
    ]
  }
})
