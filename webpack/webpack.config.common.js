const path = require('path')
const webpack = require('webpack')
const Loadable = require('react-loadable/webpack')

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
        : new webpack.HashedModuleIdsPlugin(),

      new Loadable.ReactLoadablePlugin({
        filename: path.join(distRoot, 'react-loadable.json')
      })
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
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        symlinks: false
      },

      module: {
        rules: [
          {
            test: /\.(t|j)sx?$/,
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
