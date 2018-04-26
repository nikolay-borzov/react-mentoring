import './style.css'
import 'react-toastify/dist/ReactToastify.css'

import App from './app'

import React from 'react'
import { render } from 'react-dom'

import { configureAjax } from './core/ajax'

configureAjax()

const renderApp = () => {
  render(<App />, document.getElementById('root'))
}

renderApp()

if (module.hot) {
  module.hot.accept('./app', () => {
    renderApp()
  })
}
