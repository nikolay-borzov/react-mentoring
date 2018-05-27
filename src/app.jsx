import React from 'react'
import { hot } from 'react-hot-loader'
import { ToastContainer, Slide, toast } from 'react-toastify'
import { Route, Redirect, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

import { ErrorBoundary } from './components/error-boundary'
import SearchContainer from './pages/search/search-container'
import FilmContainer from './pages/film/film-container'
import NotFound from './pages/not-found'

App.propTypes = {
  location: PropTypes.object
}

export function App({ location }) {
  return (
    <ErrorBoundary>
      <Switch location={location}>
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
    </ErrorBoundary>
  )
}

export default hot(module)(App)
