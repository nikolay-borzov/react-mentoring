// @flow

import React from 'react'

import './search-results-panel.css'

type SearchResultsPanelProps = {
  children: any
}

export function SearchResultsPanel(props: SearchResultsPanelProps) {
  return (
    <div
      className="search-results-panel font-bold padding-controls"
      data-cy="search-results-panel">
      {props.children}
    </div>
  )
}
