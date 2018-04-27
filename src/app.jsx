import React from 'react'
import { hot } from 'react-hot-loader'
import { ToastContainer, Slide } from 'react-toastify'

import { ErrorBoundary } from './components/error-boundary'
import { SearchContainer } from './pages/search/search-container'

function App() {
  return (
    <ErrorBoundary>
      <SearchContainer />
      <ToastContainer transition={Slide} />
    </ErrorBoundary>
  )
}

export default hot(module)(App)
