import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'

import reducer from './reducer'

const configureStore = preloadedState => {
  const isDevelopment = process.env.NODE_ENV !== 'production'

  const middleware = [thunk]

  const store = createStore(
    reducer,
    /* preloadedState */
    composeWithDevTools(applyMiddleware(...middleware))
  )

  if (isDevelopment && module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      store.replaceReducer(reducer)
    })
  }

  return store
}

export default configureStore
