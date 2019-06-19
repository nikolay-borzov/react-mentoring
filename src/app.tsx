import React from 'react'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { Route, Redirect, Switch } from 'react-router-dom'
import { ToastContainer, Slide, toast } from 'react-toastify'

import { GetLoadable } from './components/helpers'
import { ErrorBoundary } from './components/error-boundary'

// Loadable components
/* istanbul ignore next */
const SearchContainer = GetLoadable(() =>
  import('./pages/search/search-container')
)
/* istanbul ignore next */
const FilmContainer = GetLoadable(() => import('./pages/film/film-container'))
/* istanbul ignore next */
const NotFound = GetLoadable(() => import('./pages/not-found'))

export interface AppContext {
  url?: string
}

interface AppProps {
  Router: Function
  location: string
  context: AppContext
  store: any
}

App.defaultProps = {
  location: null,
  context: null,
  persistor: null
}

export function App({ Router, location, context, store }: AppProps) {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Router location={location} context={context}>
          <React.Fragment>
            <Switch>
              <Route path="/search/:search?" component={SearchContainer} />
              <Route path="/film/:id" component={FilmContainer} />
              <Redirect exact from="/" to="/search" />
              <Route component={NotFound} />
            </Switch>
            <ToastContainer
              transition={Slide}
              position={toast.POSITION.BOTTOM_CENTER}
              autoClose={false}
            />
          </React.Fragment>
        </Router>
      </ErrorBoundary>
    </Provider>
  )
}

export default hot(module)(App)
