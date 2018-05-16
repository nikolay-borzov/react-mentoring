import { createAction, handleAction } from 'redux-actions'
import { createSelector } from 'reselect'

import { searchBy, sortBy, sortOrder } from '../../enums'

// Selectors

const rootSelector = state => state.search

const searchSelector = createSelector(rootSelector, search => search.search)
const searchBySelector = createSelector(rootSelector, search => search.searchBy)
const sortBySelector = createSelector(rootSelector, search => search.sortBy)

export const selectors = {
  params: rootSelector,
  search: searchSelector,
  searchBy: searchBySelector,
  sortBy: sortBySelector
}

// Action Types

export const actionTypes = {
  SET_PARAMS: 'FILM_SEARCH/SEARCH/SET_PARAMS'
}

// Action Creators

const allowedParams = ['search', 'searchBy', 'sortBy']

export const setParams = createAction(actionTypes.SET_PARAMS, payload =>
  allowedParams.reduce((result, param) => {
    if (payload.hasOwnProperty(param)) {
      result[param] = payload[param]
    }

    return result
  }, {})
)

// Reducer

const initialState = {
  search: '',
  searchBy: searchBy.title,
  sortBy: sortBy.releaseDate,
  sortOrder: sortOrder.desc,
  limit: 15
}

const reducer = handleAction(
  setParams,
  (state, { payload: params }) => ({
    ...state,
    ...params
  }),
  initialState
)

export default reducer
