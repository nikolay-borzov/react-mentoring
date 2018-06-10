const express = require('express')

const isDevelopment = process.env.NODE_ENV !== 'production'

const app = express()

if (isDevelopment) {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
  const webpackConfig = require('../webpack')

  const compiler = webpack(webpackConfig)

  app.use(
    webpackDevMiddleware(compiler, {
      historyApiFallback: true
    })
  )
  app.use(
    webpackHotMiddleware(compiler.compilers.find(c => c.name === 'client'))
  )
  app.use(webpackHotServerMiddleware(compiler))
} else {
  const stats = require('../dist/react-loadable.json')
  const serverRenderer = require('../dist/server-renderer').default

  app.use(express.static('dist'))
  app.use(serverRenderer(stats))
}

module.exports = app
