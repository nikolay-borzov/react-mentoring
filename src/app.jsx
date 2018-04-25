import React from 'react'
import { hot } from 'react-hot-loader'

import { ErrorBoundary } from './core/components/error-boundary'
import { SearchContainer } from './search/search-container'

function App() {
  return (
    <ErrorBoundary>
      <SearchContainer />
    </ErrorBoundary>
  )
}

export default hot(module)(App)
