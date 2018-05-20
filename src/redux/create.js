import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'

import reducer from './reducer'

const configureStore = preloadedState => {
  const middleware = [thunk]

  /* istanbul ignore next */
  if (IS_DEVELOPMENT) {
    middleware.push(require('redux-logger').default)
  }

  const store = createStore(
    reducer,
    /* preloadedState */
    composeWithDevTools(applyMiddleware(...middleware))
  )

  /* istanbul ignore next */
  if (IS_DEVELOPMENT && module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      store.replaceReducer(reducer)
    })
  }

  return store
}

export default configureStore
