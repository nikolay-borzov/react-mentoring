import React from 'react'
import PropTypes from 'prop-types'

import { Radio, SearchResultsPanel, FilmsGrid } from '../../../components'

import { sortBy } from '../../../enums'

export class SearchResults extends React.PureComponent {
  static propTypes = {
    foundCount: PropTypes.number.isRequired,
    displayCount: PropTypes.number.isRequired,
    films: PropTypes.arrayOf(PropTypes.object).isRequired,
    sortBy: PropTypes.oneOf(Object.values(sortBy)).isRequired,
    onSortByChange: PropTypes.func.isRequired
  }

  sortOptions = [
    {
      name: 'release date',
      value: sortBy.releaseDate
    },
    {
      name: 'rating',
      value: sortBy.rating
    }
  ]

  render() {
    const {
      sortBy,
      films,
      foundCount,
      displayCount,
      onSortByChange
    } = this.props

    const filmsFound = (
      <div>
        {foundCount}&nbsp;
        {foundCount > 1 ? 'movies' : 'movie'}
        &nbsp;found ({displayCount} shown)
      </div>
    )

    return (
      <React.Fragment>
        <SearchResultsPanel>
          {filmsFound}
          <Radio
            name="sortBy"
            label="Sort by"
            value={sortBy}
            options={this.sortOptions}
            onChange={onSortByChange}
          />
        </SearchResultsPanel>
        <FilmsGrid films={films} />
      </React.Fragment>
    )
  }
}
