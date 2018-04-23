const path = require('path')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const srcRoot = path.resolve(__dirname, 'src')
const assetsRoot = path.join(srcRoot, 'assets')
const distRoot = path.resolve(__dirname, 'dist')

module.exports = {
  cssRule: {
    test: /\.css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: { importLoaders: 1, sourceMap: true }
      },
      { loader: 'postcss-loader', options: { sourceMap: true } }
    ]
  },

  getImageRule(filename) {
    return {
      test: /\.(png|svg|jpg|gif)$/,
      loader: 'file-loader',
      options: {
        name: filename
      }
    }
  },

  getFontRule(filename) {
    return {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      loader: 'file-loader',
      options: {
        name: filename
      }
    }
  },

  getConfig(env) {
    const plugins = [
      new CleanWebpackPlugin([distRoot]),
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
    ]

    if (process.env.ANALIZE) {
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
        .BundleAnalyzerPlugin
      plugins.push(new BundleAnalyzerPlugin())
    }

    return {
      // Webpack default is './src/index.js '
      entry: {
        main: './src/index.js'
      },

      plugins,

      output: {
        path: distRoot,
        publicPath: '/'
      },

      resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.js', '.jsx'],
        symlinks: false
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
        rules: [
          // JS/JSX
          {
            test: /\.jsx?$/,
            include: srcRoot,
            loader: 'babel-loader'
          }
        ]
      }
    }
  }
}
