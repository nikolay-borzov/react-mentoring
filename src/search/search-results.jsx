import React from 'react'
import PropTypes from 'prop-types'

import { SearchResultsPanel } from './search-results-panel'
import { Radio, FilmGrid } from '../core/components'

import { sortBy } from '../core/enums'

export class SearchResults extends React.Component {
  static propTypes = {
    foundCount: PropTypes.number.isRequired,
    films: PropTypes.arrayOf(PropTypes.object).isRequired,
    sortBy: PropTypes.oneOf(Object.values(sortBy)),
    onSortByChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.sortOptions = [
      {
        name: 'release date',
        value: sortBy.releaseDate
      },
      {
        name: 'rating',
        value: sortBy.rating
      }
    ]
  }

  render() {
    const filmsFound = (
      <div>
        {this.props.foundCount}&nbsp;
        {this.props.foundCount > 1 ? 'movies' : 'movie'}
        &nbsp;found
      </div>
    )

    return (
      <React.Fragment>
        <SearchResultsPanel>
          {filmsFound}
          <div className="flex">
            <Radio
              name="sortBy"
              label="Sort by"
              value={this.props.sortBy}
              options={this.sortOptions}
              onChange={this.props.onSortByChange}
            />
          </div>
        </SearchResultsPanel>
        <FilmGrid {...this.props} />
      </React.Fragment>
    )
  }
}
