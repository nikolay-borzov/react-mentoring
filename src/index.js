import './style.css'
import 'react-toastify/dist/ReactToastify.css'

import App from './app'

import React from 'react'
import { render } from 'react-dom'

import apiService from './services/api-service'

apiService.init()

const renderApp = () => {
  render(<App />, document.getElementById('root'))
}

renderApp()

if (module.hot) {
  module.hot.accept('./app', () => {
    renderApp()
  })
}
