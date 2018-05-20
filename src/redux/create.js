import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'

import reducer from './reducer'

const configureStore = () => {
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

  const persistor = persistStore(store)

  return { store, persistor }
}

export default configureStore
