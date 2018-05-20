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

const allowedParams = [
  'search',
  'searchBy',
  'sortBy',
  'sortOrder',
  'limit',
  'filter'
]

export default function createSearchParamsSlice({
  id,
  rootSelector,
  initialState
}) {
  const filterAllowedParams = source => {
    return allowedParams.reduce((result, param) => {
      if (source.hasOwnProperty(param)) {
        result[param] = source[param]
      }

      return result
    }, {})
  }

  // Selectors
  // Exclude props added by redux-persist
  const paramsSelector = createSelector(rootSelector, search => {
    return filterAllowedParams(search)
  })
  const searchSelector = createSelector(rootSelector, search => search.search)
  const searchBySelector = createSelector(
    rootSelector,
    search => search.searchBy
  )
  const sortBySelector = createSelector(rootSelector, search => search.sortBy)
  const filterSelector = createSelector(rootSelector, search => search.filter)

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

  const setParams = createAction(actionTypes.SET_PARAMS, payload =>
    filterAllowedParams(payload)
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
