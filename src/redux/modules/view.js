import { combineReducers } from 'redux'
import { createAction } from 'redux-actions'
import { createSelector } from 'reselect'
import { all, call, put, takeLatest, select } from 'redux-saga/effects'

import { searchBy, sortBy, sortOrder } from '../../enums'

import createFilmSlice from './slices/film'
import createSearchParamsSlice from './slices/search-params'
import createFilmsSlice from './slices/films'

/* State Shape
  {
    film: {},
    relatedFilms: {
      searchParams: {},
      films: []
    }
  }
*/

const sliceId = 'VIEW'

/* Slices */

const relatedFilmsSelector = state => state.view.relatedFilms

const filmSlice = createFilmSlice({
  id: sliceId,
  rootSelector: state => state.view.film
})

const searchParamsSlice = createSearchParamsSlice({
  id: sliceId,
  rootSelector: createSelector(
    relatedFilmsSelector,
    relatedFilms => relatedFilms.searchParams
  ),
  initialState: {
    search: '',
    searchBy: searchBy.genres,
    sortBy: sortBy.rating,
    sortOrder: sortOrder.desc,
    limit: 20,
    filter: []
  }
})

const filmsSlice = createFilmsSlice({
  id: sliceId,
  rootSelector: createSelector(
    relatedFilmsSelector,
    relatedFilms => relatedFilms.films
  ),
  searchParamsSelector: searchParamsSlice.selectors.params
})

// Selectors

export const selectors = {
  film: filmSlice.selectors,
  relatedFilms: {
    searchParams: searchParamsSlice.selectors,
    films: filmsSlice.selectors
  }
}

// Action Types

export const actionTypes = {
  RE_FETCH_FILMS: `${sliceId}/RE_FETCH_FILMS`,
  ...filmSlice.actionTypes
}

// Action Creators

export const fetchFilm = filmSlice.actionCreators.fetchFilm
export const reFetchFilms = createAction(actionTypes.RE_FETCH_FILMS)

// for tests
export const setParams = searchParamsSlice.actionCreators.setParams
export const fetchFilms = filmsSlice.actionCreators.fetchFilms
// Sagas

/**
 * Updates related films search params and fetches films
 */
export function* fetchRelatedFilmsAsync({ payload: film } = {}) {
  if (!film) {
    film = yield select(filmSlice.selectors.film)
  }

  if (film.id) {
    yield put(
      searchParamsSlice.actionCreators.setParams({
        search: film.genres[0]
      })
    )

    yield put(filmsSlice.actionCreators.fetchFilms())
  }
}

export function* watchFilmLoad() {
  yield call(
    takeLatest,
    filmSlice.actionTypes.FETCH_FILM_SUCCESS,
    fetchRelatedFilmsAsync
  )
}

export function* watchReFetchFilms() {
  yield call(takeLatest, actionTypes.RE_FETCH_FILMS, fetchRelatedFilmsAsync)
}

export function* viewSagas() {
  yield all([
    filmSlice.getSagas(),
    filmsSlice.getSagas(),
    watchFilmLoad(),
    watchReFetchFilms()
  ])
}

// Reducer

const rootReducer = combineReducers({
  film: filmSlice.reducer,
  relatedFilms: combineReducers({
    searchParams: searchParamsSlice.reducer,
    films: filmsSlice.reducer
  })
})

export default rootReducer
