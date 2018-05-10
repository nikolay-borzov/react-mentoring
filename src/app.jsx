import React from 'react'
import { hot } from 'react-hot-loader'
import { ToastContainer, Slide, toast } from 'react-toastify'

import { ErrorBoundary } from './components/error-boundary'
import { SearchContainer } from './pages/search/search-container'
import { FilmContainer } from './pages/film/film-container'

export function App() {
  const searchParams = new URLSearchParams(location.search)

  // TODO: Remove after React Router integration
  const isFilmPage = searchParams.has('id')

  return (
    <ErrorBoundary>
      {isFilmPage ? (
        <FilmContainer filmId={parseInt(searchParams.get('id'), 10)} />
      ) : (
        <SearchContainer />
      )}
      <ToastContainer
        transition={Slide}
        position={toast.POSITION.BOTTOM_CENTER}
        autoClose={false}
      />
    </ErrorBoundary>
  )
}

export default hot(module)(App)
