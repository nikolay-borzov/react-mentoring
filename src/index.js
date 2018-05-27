import './style.css'
import 'react-toastify/dist/ReactToastify.css'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import App from './app'

import apiService from './services/api-service'
import configureStore from './redux/create'

apiService.init()

const { store, persistor } = configureStore()

const renderApp = () => {
  // TODO: Add loading indicator
  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Route path="/" component={App} />
        </Router>
      </PersistGate>
    </Provider>,
    document.getElementById('root')
  )
}

renderApp()

/* istanbul ignore next */
if (module.hot) {
  module.hot.accept('./app', renderApp)
}
