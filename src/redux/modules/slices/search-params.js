import { createAction, handleAction } from 'redux-actions'
import { createSelector } from 'reselect'

/* State shape
  {
    search: ''
    searchBy: ''
    sortBy: ''
    sortOrder: ''
    limit: 1
    filter: []
  }
*/

export default function createSearchParamsSlice({
  id,
  rootSelector,
  initialState
}) {
  // Selectors

  const searchSelector = createSelector(rootSelector, search => search.search)
  const searchBySelector = createSelector(
    rootSelector,
    search => search.searchBy
  )
  const sortBySelector = createSelector(rootSelector, search => search.sortBy)
  const filterSelector = createSelector(rootSelector, search => search.filter)

  const selectors = {
    params: rootSelector,
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

  const allowedParams = [
    'search',
    'searchBy',
    'sortBy',
    'sortOrder',
    'limit',
    'filter'
  ]

  const setParams = createAction(actionTypes.SET_PARAMS, payload =>
    allowedParams.reduce((result, param) => {
      if (payload.hasOwnProperty(param)) {
        result[param] = payload[param]
      }

      return result
    }, {})
  )

  // Reducer

  const reducer = handleAction(
    setParams,
    (state, { payload: params }) => ({
      ...state,
      ...params
    }),
    initialState
  )

  return {
    selectors,
    actionTypes,
    actionCreators: {
      setParams
    },
    reducer
  }
}
