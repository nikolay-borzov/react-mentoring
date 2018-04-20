import React from 'react'
import PropTypes from 'prop-types'

import { SearchResultsPanel } from './search-results-panel'

export class SearchResults extends React.Component {
  static propTypes = {
    foundCount: PropTypes.number
  }

  render() {
    return (
      <React.Fragment>
        <SearchResultsPanel>
          <div>
            {this.props.foundCount}{' '}
            {this.props.foundCount > 1 ? 'movies' : 'movie'}
            &nbsp;found
          </div>
          <div>Sort by release date rating</div>
        </SearchResultsPanel>
        SEARCH RESULTS
      </React.Fragment>
    )
  }
}
