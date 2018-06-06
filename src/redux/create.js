import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
// import { persistStore } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'

import reducer, { rootSaga } from './reducer'

const configureStore = preloadedState => {
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [sagaMiddleware]

  /* istanbul ignore next */
  if (IS_DEVELOPMENT && !IS_SERVER) {
    middleware.push(require('redux-logger').default)
  }

  const store = createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middleware))
  )

  sagaMiddleware.run(rootSaga)
  store.runSaga = () => sagaMiddleware.run(rootSaga)
  store.close = () => store.dispatch(END)

  // TODO: https://github.com/rt2zz/redux-persist/blob/master/docs/hot-module-replacement.md
  /* istanbul ignore next */
  if (IS_DEVELOPMENT && module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      store.replaceReducer(reducer)
    })
  }

  // TODO: Disable redux-persist because of problems during SSR
  // const persistor = persistStore(store)

  return { store }
}

export default configureStore
