import React from 'react'
import { hot } from 'react-hot-loader'

import { ErrorBoundary } from './core/components/error-boundary'
import { ToastContainer, Slide } from 'react-toastify'
import { SearchContainer } from './search/search-container'

function App() {
  return (
    <ErrorBoundary>
      <SearchContainer />
      <ToastContainer transition={Slide} />
    </ErrorBoundary>
  )
}

export default hot(module)(App)
