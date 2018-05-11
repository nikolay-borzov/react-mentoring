import { createSelector } from 'reselect'
import { searchBy, sortBy, sortOrder } from '../../enums'

// Actions Types

export const actions = {
  SET_QUERY: 'film-search/search/SET_QUERY',
  SET_SEARCH_BY: 'film-search/search/SET_SEARCH_BY',
  SET_SORT_BY: 'film-search/search/SET_SORT_BY'
}

// Reducer

const initialState = {
  search: '',
  searchBy: searchBy.title,
  sortBy: sortBy.releaseDate,
  sortOrder: sortOrder.desc,
  limit: 15
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.SET_SEARCH:
      return {
        ...state,
        search: action.value
      }

    case actions.SET_SEARCH_BY:
      return {
        ...state,
        searchBy: action.value
      }

    case actions.SET_SORT_BY:
      return {
        ...state,
        sortBy: action.value
      }

    default:
      return state
  }
}

// Action Creators

export const setSearch = value => ({
  type: actions.SET_QUERY,
  value
})

export const setSearchBy = value => ({
  type: actions.SET_SEARCH_BY,
  value
})

export const setSortBy = value => ({
  type: actions.SET_SORT_BY,
  value
})

// Selectors

const rootSelector = state => state.search

const searchSelector = createSelector(rootSelector, search => search.search)
const searchBySelector = createSelector(rootSelector, search => search.searchBy)
const sortBySelector = createSelector(rootSelector, search => search.sortBy)

export const selectors = {
  search: searchSelector,
  searchBy: searchBySelector,
  sortBy: sortBySelector
}
