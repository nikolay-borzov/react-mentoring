import { createAction } from 'redux-actions'
import { createSelector } from 'reselect'

import filmService from '../../../services/film-service'

/* State shape
  {
    items: [],
    total: 0,
    limit: 0,
    isFetching: false,
    error: null
  }
*/

export default function createFilmsSlice({
  id,
  rootSelector,
  initialState = {
    items: [],
    total: 0,
    limit: 0,
    isFetching: false,
    error: null
  },
  searchParamsSelector
}) {
  // Selectors

  const filmsSelector = createSelector(rootSelector, films => films.items)
  const totalSelector = createSelector(rootSelector, films => films.total)
  const limitSelector = createSelector(rootSelector, films => films.limit)
  const errorSelector = createSelector(rootSelector, films => films.error)
  const isFetchingSelector = createSelector(
    rootSelector,
    films => films.isFetching
  )

  const selectors = {
    films: filmsSelector,
    total: totalSelector,
    limit: limitSelector,
    error: errorSelector,
    isFetching: isFetchingSelector
  }

  // Action Types

  const actionTypes = {
    FETCH_FILMS_REQUEST: `${id}/FETCH_FILMS_REQUEST`,
    FETCH_FILMS_SUCCESS: `${id}/FETCH_FILMS_SUCCESS`,
    FETCH_FILMS_FAIL: `${id}/FETCH_FILMS_FAIL`
  }

  // Action Creators

  const fetchFilmsRequest = createAction(actionTypes.FETCH_FILMS_REQUEST)
  const fetchFilmsSuccess = createAction(actionTypes.FETCH_FILMS_SUCCESS)
  const fetchFilmsFail = createAction(actionTypes.FETCH_FILMS_FAIL)

  const fetchFilms = () => (dispatch, getState) => {
    dispatch(fetchFilmsRequest())

    const searchParams = searchParamsSelector(getState())

    return filmService.getFilms(searchParams).then(
      result => dispatch(fetchFilmsSuccess(result)),
      error => {
        dispatch(fetchFilmsFail(error))
        // Re-throw error  so it can be handled inside component
        throw error
      }
    )
  }

  // Reducer

  const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case actionTypes.FETCH_FILMS_REQUEST:
        return {
          ...state,
          isFetching: true
        }

      case actionTypes.FETCH_FILMS_SUCCESS:
        return {
          ...state,
          items: payload.data,
          total: payload.total,
          limit: payload.limit,
          error: null,
          isFetching: false
        }

      case actionTypes.FETCH_FILMS_FAIL:
        return {
          ...state,
          error: payload,
          isFetching: false
        }

      default:
        return state
    }
  }

  return {
    selectors,
    actionTypes,
    actionCreators: {
      fetchFilms
    },
    reducer
  }
}
