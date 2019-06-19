import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import { StaticRouter } from 'react-router-dom'
import { Helmet, HelmetData } from 'react-helmet'
import serialize from 'serialize-javascript'
import Loadable from 'react-loadable'
import { getBundles, Manifest, Bundle } from 'react-loadable/webpack'
import { Request, Response } from 'express'

import App, { AppContext } from './app'
import configureStore from './redux/create'
import apiService from './services/api-service'
import { AppState } from './redux/reducer'

const isDevelopment = process.env.NODE_ENV === 'development'

function renderHTML({
  htmlString,
  helmet,
  faviconHtml,
  styles,
  bundles,
  preloadedState
}: {
  htmlString: string
  helmet: HelmetData
  faviconHtml: string
  styles: string
  bundles: Bundle[]
  preloadedState: AppState
}) {
  const safePreloadedState = serialize(preloadedState)
  // TODO: Add hash to resource URIs
  return `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta http-equiv="x-ua-compatible" content="ie=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
          ${helmet.title.toString()}
          ${faviconHtml}
          ${
            isDevelopment
              ? ''
              : '<link href="/client.css" rel="stylesheet" type="text/css">'
          }
          ${styles}
        </head>
        <body>
          <div id="root" class="root-container">${htmlString}</div>
          <script>
            window.PRELOADED_STATE = ${safePreloadedState}
          </script>
          <script src="/runtime.js"></script>
          ${bundles
            .map(bundle => `<script src="/${bundle.file}"></script>`)
            .join('\n')}
          <script src="/vendors.js"></script>
          <script src="/client.js"></script>
        </body>
      </html>
  `
}

apiService.init()

export default function serverRenderer({
  stats,
  faviconHtml = ''
}: {
  stats: Manifest
  faviconHtml: string
}) {
  return (req: Request, res: Response) => {
    const { store, runSaga, close } = configureStore()
    // This context object contains the results of the render
    const context: AppContext = {}

    const root = (
      <App
        context={context}
        location={req.url}
        Router={StaticRouter}
        store={store}
      />
    )

    runSaga().then(() => {
      // Dynamic modules that were rendered
      const modules: string[] = []

      const sheet = new ServerStyleSheet()

      const htmlString = renderToString(
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
          <StyleSheetManager sheet={sheet.instance}>{root}</StyleSheetManager>
        </Loadable.Capture>
      )
      const helmet = Helmet.renderStatic()
      const styles = sheet.getStyleTags()

      // context.url will contain the URL to redirect to if a <Redirect> was used
      if (context.url) {
        res.writeHead(302, {
          Location: context.url
        })
        res.end()
        return
      }

      let bundles = getBundles(stats, modules)

      const preloadedState = store.getState()

      res.send(
        renderHTML({
          htmlString,
          helmet,
          faviconHtml,
          styles,
          bundles,
          preloadedState
        })
      )
    })

    // Do first render, starts initial actions.
    renderToString(root)

    // When the first render is finished, send the END action to redux-saga.
    close()
  }
}
