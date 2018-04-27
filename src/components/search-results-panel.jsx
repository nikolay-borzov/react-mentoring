import React from 'react'
import PropTypes from 'prop-types'

import './search-results-panel.css'

export class SearchResultsPanel extends React.Component {
  static propTypes = {
    children: PropTypes.any
  }

  render() {
    return (
      <div className="search-results-panel font-bold">
        {this.props.children}
      </div>
    )
  }
}
