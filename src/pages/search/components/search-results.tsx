import React from 'react'

import { GetLoadable } from '../../../components/helpers'
import {
  SearchResultsPanel,
  RadioControlled,
  FilmsGridProps
} from '../../../components'
import { sortBy } from '../../../enums'
import { Film } from '../../../entities/film'
import { SortBy } from '../../../services/film-service'

/* istanbul ignore next */
const FilmsGrid = GetLoadable<FilmsGridProps>(() =>
  import('../../../components/films-grid/films-grid')
)

export interface SearchResultsProps {
  foundCount: number
  displayCount: number
  films: Film[]
  sortBy?: SortBy
  onSortByChange(value: string): void
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
      <>
        <SearchResultsPanel>
          {filmsFound}
          <RadioControlled
            name="sortBy"
            label="Sort by"
            value={sortBy}
            options={this.sortOptions}
            onChange={onSortByChange}
          />
        </SearchResultsPanel>
        <FilmsGrid films={films} />
      </>
    )
  }
}

export default SearchResults
