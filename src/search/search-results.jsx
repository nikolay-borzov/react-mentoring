import React from 'react'
import PropTypes from 'prop-types'

import { SearchResultsPanel } from './search-results-panel'
import { Radio } from '../core/components/radio'
import { FilmGrid } from '../core/components/film-grid'

export class SearchResults extends React.Component {
  static propTypes = {
    foundCount: PropTypes.number
  }

  constructor(props) {
    super(props)

    this.state = {
      sortOptions: [
        {
          name: 'release date',
          value: 'dateRelease'
        },
        {
          name: 'rating',
          value: 'rating'
        }
      ]
    }
  }

  render() {
    return (
      <React.Fragment>
        <SearchResultsPanel>
          <div>
            {this.props.foundCount}&nbsp;
            {this.props.foundCount > 1 ? 'movies' : 'movie'}
            &nbsp;found
          </div>
          <div className="flex">
            <Radio
              name="sortBy"
              label="Sort by"
              value="dateRelease"
              options={this.state.sortOptions}
            />
          </div>
        </SearchResultsPanel>
        <FilmGrid />
      </React.Fragment>
    )
  }
}
