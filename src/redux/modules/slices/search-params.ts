import { createActionCreator, createReducer } from 'deox'
import { createSelector } from 'reselect'

import { GetFilmsParams } from '../../../services/film-service'

// `redux-persist` adds additional props to state, we need to filter them out. Perhaps it isn't actual anymore
export type SearchParamsState = GetFilmsParams

type State = SearchParamsState

interface CreateSearchParamsSliceParams {
  id: string
  initialState: State
  rootSelector(parentState: any): State
}

const allowedParams: (keyof GetFilmsParams)[] = [
  'search',
  'searchBy',
  'sortBy',
  'sortOrder',
  'limit',
  'filter'
]

export default function createSearchParamsSlice(
  params: CreateSearchParamsSliceParams
) {
  const { id, rootSelector, initialState } = params

  const filterAllowedParams = (source: State) =>
    allowedParams.reduce<State>((result, param) => {
      if (source.hasOwnProperty(param)) {
        // TODO: Resolve typing errors
        result[param] = source[param] as any
      }

      return result
    }, {})

  // Selectors

  // Exclude props added by redux-persist
  const paramsSelector = createSelector(
    rootSelector,
    filterAllowedParams
  )
  const searchSelector = createSelector(
    rootSelector,
    search => search.search
  )
  const searchBySelector = createSelector(
    rootSelector,
    search => search.searchBy
  )
  const sortBySelector = createSelector(
    rootSelector,
    search => search.sortBy
  )
  const filterSelector = createSelector(
    rootSelector,
    search => search.filter
  )

  const selectors = {
    params: paramsSelector,
    search: searchSelector,
    searchBy: searchBySelector,
    sortBy: sortBySelector,
    filter: filterSelector
  }

  // Action Types

  const actionTypes = {
    SET_PARAMS: `${id}/SET_PARAMS`
  }

  // Action Creators

  const setParams = createActionCreator(
    actionTypes.SET_PARAMS,
    resolve => (params: State) => resolve(filterAllowedParams(params))
  )

  // Reducer

  const reducer = createReducer(initialState, handleAction => [
    handleAction(setParams, (state, { payload: params }) => ({
      ...state,
      ...params
    }))
  ])

  return {
    selectors,
    actionTypes,
    actionCreators: {
      setParams
    },
    reducer
  }
}
