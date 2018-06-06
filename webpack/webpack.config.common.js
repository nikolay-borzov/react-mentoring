const path = require('path')
const webpack = require('webpack')

require('dotenv').config()

const isDevelopment = process.env.NODE_ENV !== 'production'

const mode = isDevelopment ? 'development' : 'production'

const srcRoot = path.resolve(__dirname, '../src')
const assetsRoot = path.join(srcRoot, 'assets')
const distRoot = path.resolve(__dirname, '../dist')

module.exports = {
  srcRoot,
  assetsRoot,
  distRoot,

  isDevelopment,

  getConfig() {
    const plugins = [
      new webpack.DefinePlugin({
        API_URL: JSON.stringify(process.env.API_URL),
        IS_DEVELOPMENT: isDevelopment
      }),
      isDevelopment
        ? new webpack.NamedModulesPlugin()
        : new webpack.HashedModuleIdsPlugin()

      /* 
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
        }) */
    ]

    if (process.env.ANALYZE) {
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
        .BundleAnalyzerPlugin
      plugins.push(new BundleAnalyzerPlugin())
    }

    return {
      mode,

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

      module: {
        rules: [
          // JS/JSX
          {
            test: /\.jsx?$/,
            // exclude: /node_modules/,
            include: srcRoot,
            loader: 'babel-loader',
            options: {
              // Enable caching results in ./node_modules/.cache/babel-loader/ directory for faster rebuilds.
              cacheDirectory: true
            }
          }
        ]
      }
    }
  }
}
