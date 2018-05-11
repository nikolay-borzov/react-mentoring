import './style.css'
import 'react-toastify/dist/ReactToastify.css'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './app'

import apiService from './services/api-service'
import configureStore from './redux/create'

apiService.init()

const store = configureStore()

const renderApp = () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

renderApp()

if (module.hot) {
  module.hot.accept('./app', renderApp)
}
