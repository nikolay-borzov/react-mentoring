const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const srcRoot = path.resolve(__dirname, 'src')
const assetsRoot = path.join(srcRoot, 'assets')
const distRoot = path.resolve(__dirname, 'dist')

module.exports = {
  entry: {
    index: './src/index.js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true
    }),
    new FaviconsWebpackPlugin({
      logo: path.join(assetsRoot, 'favicon.png'),
      emitStats: false,
      background: '#4F5D73',
      title: 'Film Search',
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: true
      }
    })
  ],

  output: {
    filename: '[name].bundle.js',
    path: distRoot,
    publicPath: '/'
  },

  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx'],
    symlinks: false
  },

  module: {
    rules: [
      // JS/JSX
      {
        test: /\.jsx?$/,
        include: srcRoot,
        loader: 'babel-loader'
      },

      // Images
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  }
}
