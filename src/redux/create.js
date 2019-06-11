import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
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
  /* istanbul ignore next */
  store.runSaga = () => sagaMiddleware.run(rootSaga).toPromise()
  /* istanbul ignore next */
  store.close = () => store.dispatch(END)

  /* istanbul ignore next */
  if (IS_DEVELOPMENT && module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      store.replaceReducer(reducer)
    })
  }

  return { store }
}

export default configureStore
