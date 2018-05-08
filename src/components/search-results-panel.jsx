import React from 'react'
import PropTypes from 'prop-types'

import './search-results-panel.css'

SearchResultsPanel.propTypes = {
  children: PropTypes.any
}

export function SearchResultsPanel(props) {
  return (
    <div
      className="search-results-panel font-bold padding-controls"
      data-cy="search-results-panel">
      {props.children}
    </div>
  )
}
