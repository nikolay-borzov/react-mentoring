const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const opn = require('opn')

const config = require('./webpack.dev.js')

const port = process.env.PORT || 3000
const isDevelopment = process.env.NODE_ENV !== 'production'

const dist = config.output.path
const indexFile = path.join(dist, 'index.html')

const app = express()
const compiler = webpack(config)

let listenCallback = () => {}

if (isDevelopment) {
  const devMiddlewareIntance = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  })

  app.use(devMiddlewareIntance)

  app.use(webpackHotMiddleware(compiler))

  /* TODO: Remove? Looks like server works without it.
  app.get('*', (req, res) => {
    //res.sendFile(indexFile)
    devMiddlewareIntance.waitUntilValid(() => {
      compiler.outputFileSystem.readFile(indexFile, function(err, result) {
        if (err) {
          return next(err)
        }
        res.set('content-type', 'text/html')
        res.send(result)
        res.end()
      })
    })
  })*/

  listenCallback = () => {
    const url = `http://localhost:${port}`

    console.log('Listening at', url)
    opn(url)
  }
} else {
  app.use(express.static(dist))

  app.get('*', (req, res) => {
    res.sendFile(indexFile)
  })

  listenCallback = () => {
    console.log('Listening at', `http://localhost:${port}`)
  }
}

app.listen(port, listenCallback)
