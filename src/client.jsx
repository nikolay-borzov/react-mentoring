import 'babel-polyfill'

import './style.css'
import 'react-toastify/dist/ReactToastify.css'

import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './app'

import configureStore from './redux/create'
import apiService from './services/api-service'

apiService.init()

const { store } = configureStore(window.PRELOADED_STATE)

const renderApp = () => {
  hydrate(
    <App Router={BrowserRouter} store={store} />,
    document.getElementById('root')
  )
}

renderApp()

/* istanbul ignore next */
if (module.hot) {
  module.hot.accept('./app', renderApp)
}
