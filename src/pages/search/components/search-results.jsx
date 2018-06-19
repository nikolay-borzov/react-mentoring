// @flow

import React from 'react'

import { GetLoadable } from '../../../components/helpers'

import { Radio, SearchResultsPanel } from '../../../components'

import { sortBy } from '../../../enums'

/* istanbul ignore next */
const FilmsGrid = GetLoadable(() =>
  import('../../../components/films-grid/films-grid')
)

type SearchResultsProps = {
  foundCount: number,
  displayCount: number,
  films: object[],
  sortBy: string,
  onSortByChange: Function
}

export class SearchResults extends React.PureComponent<SearchResultsProps> {
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
        &nbsp;found{' '}
        {foundCount > displayCount ? `(${displayCount} shown)` : null}
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

export default SearchResults
