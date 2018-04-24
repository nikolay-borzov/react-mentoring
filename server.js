const express = require('express')
const webpack = require('webpack')

const port = process.env.PORT || 3000
const isDevelopment = process.env.NODE_ENV !== 'production'

const app = express()

const configure = isDevelopment
  ? configureForDevelopment
  : configureForProduction

configure(app)
  .then(({ callback }) => {
    app.listen(port, callback)
  })
  .catch(error => {
    console.log(error)
  })

function configureForDevelopment(app) {
  return new Promise(resolve => {
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const opn = require('opn')

    const config = require('./webpack.dev.js')

    const compiler = webpack(config)

    app.use(
      webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
      })
    )

    app.use(webpackHotMiddleware(compiler))

    resolve({
      callback: () => {
        const url = `http://localhost:${port}`

        console.log('Listening on', url)
        opn(url)
      }
    })
  })
}

function configureForProduction(app) {
  return new Promise((resolve, reject) => {
    const path = require('path')

    const config = require('./webpack.prod.js')

    const dist = config.output.path
    const indexFile = path.join(dist, 'index.html')
    // Serve bundle
    app.use(express.static(dist))
    // Return index.html
    app.get('*', (req, res) => {
      res.sendFile(indexFile)
    })

    webpack(config, (err, stats) => {
      if (err || stats.hasErrors()) {
        if (err) {
          console.log(err)
        } else if (stats.hasErrors()) {
          console.log(
            stats.toString({
              chunks: false,
              colors: true
            })
          )
        }

        reject(err)
      } else {
        resolve({
          callback: () => {
            console.log('Listening on', port)
          }
        })
      }
    })
  })
}
