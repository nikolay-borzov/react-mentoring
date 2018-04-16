import './style.css'

import React from 'react'
import ReactDOM from 'react-dom'

import { SearchContainer } from './search/search-container'

function App() {
  return (
    <React.Fragment>
      <SearchContainer />
    </React.Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

if (module.hot) {
  module.hot.accept()
}
