import 'babel-polyfill'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import serialize from 'serialize-javascript'

import App from './app'
import configureStore from './redux/create'
import apiService from './services/api-service'

const isDevelopment = process.env.NODE_ENV === 'development'

// const REHYDRATE_KEY = '_persist'
/**
 * https://github.com/rt2zz/redux-persist/issues/457
 * @param {Object} state
 */
/* function enableClientStoreRehydrate(state) {
  if (!state) {
    return
  }

  Object.keys(state).forEach(key => {
    if (key === REHYDRATE_KEY) {
      delete state[key]
    } else if (typeof state[key] === 'object' && !key.startsWith('_')) {
      enableClientStoreRehydrate(state[key])
    }
  })
} */

function renderHTML(html, helmet, preloadedState) {
  const safePreloadedState = serialize(preloadedState)
  // TODO: Add hash to resource URIs
  // TODO: Add favicon
  return `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta http-equiv="x-ua-compatible" content="ie=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${
            isDevelopment
              ? ''
              : '<link href="/client.css" rel="stylesheet" type="text/css">'
          }
        </head>
        <body>
          <div id="root" class="root-container">${html}</div>
          <script>
            window.PRELOADED_STATE = ${safePreloadedState}
          </script>
          <script type="text/javascript" src="/runtime.js"></script>
          <script type="text/javascript" src="/vendors.js"></script>
          <script type="text/javascript" src="/client.js"></script>
        </body>
      </html>
  `
}

apiService.init()

export default function serverRenderer() {
  return (req, res) => {
    const { store } = configureStore()
    // This context object contains the results of the render
    const context = {}

    const root = (
      <App
        context={context}
        location={req.url}
        Router={StaticRouter}
        store={store}
      />
    )

    store.runSaga().done.then(() => {
      const htmlString = renderToString(root)
      const helmet = Helmet.renderStatic()

      // context.url will contain the URL to redirect to if a <Redirect> was used
      if (context.url) {
        res.writeHead(302, {
          Location: context.url
        })
        res.end()
        return
      }

      const preloadedState = store.getState()
      // TODO: redux-persist doesn't work on server side
      // enableClientStoreRehydrate(preloadedState)

      res.send(renderHTML(htmlString, helmet, preloadedState))
    })

    // Do first render, starts initial actions.
    renderToString(root)
    // When the first render is finished, send the END action to redux-saga.
    store.close()
  }
}
