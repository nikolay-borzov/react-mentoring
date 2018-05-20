import { createSelector } from 'reselect'
import { createAction, handleActions } from 'redux-actions'

import filmService from '../../../services/film-service'

/* State shape
  {
    item: {}
    error: {}
    isFetching: false
  }
*/

export default function createFilmSlice({
  id,
  rootSelector,
  initialState = {
    item: null,
    isFetching: false,
    error: null
  }
}) {
  // Selectors

  const filmSelector = createSelector(rootSelector, film => film.item)
  const errorSelector = createSelector(rootSelector, film => film.error)
  const isFetchingSelector = createSelector(
    rootSelector,
    film => film.isFetching
  )

  const selectors = {
    film: filmSelector,
    error: errorSelector,
    isFetching: isFetchingSelector
  }

  // Action Types

  const actionTypes = {
    FETCH_FILM_REQUEST: `${id}/FETCH_FILM_REQUEST`,
    FETCH_FILM_SUCCESS: `${id}/FETCH_FILM_SUCCESS`,
    FETCH_FILM_FAIL: `${id}/FETCH_FILM_FAIL`
  }

  // Action Creators

  const fetchFilmRequest = createAction(actionTypes.FETCH_FILM_REQUEST)
  const fetchFilmSuccess = createAction(actionTypes.FETCH_FILM_SUCCESS)
  const fetchFilmFail = createAction(actionTypes.FETCH_FILM_FAIL)

  const fetchFilm = id => (dispatch, getState) => {
    dispatch(fetchFilmRequest())

    return filmService.getFilm(id).then(
      result => dispatch(fetchFilmSuccess(result)),
      error => {
        dispatch(fetchFilmFail(error))
        // Re-throw error  so it can be handled within component
        throw error
      }
    )
  }

  // Reducer

  const reducer = handleActions(
    {
      [fetchFilmRequest]: state => ({
        ...state,
        isFetching: true
      }),

      [fetchFilmSuccess]: (state, { payload }) => ({
        ...state,
        item: payload,
        error: null,
        isFetching: false
      }),

      [fetchFilmFail]: (state, { payload }) => ({
        ...state,
        error: payload,
        isFetching: false
      })
    },
    initialState
  )

  return {
    selectors,
    actionTypes,
    actionCreators: {
      fetchFilm
    },
    reducer
  }
}
