import React from 'react'
import PropTypes from 'prop-types'

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
