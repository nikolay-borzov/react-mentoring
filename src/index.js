import './style.css'

import React from 'react'
import ReactDOM from 'react-dom'

import { configureAjax } from './core/ajax'

import { ErrorBoundary } from './core/components/error-boundary'
import { SearchContainer } from './search/search-container'

configureAjax()

function App() {
  return (
    <ErrorBoundary>
      <SearchContainer />
    </ErrorBoundary>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

if (module.hot) {
  module.hot.accept()
}
