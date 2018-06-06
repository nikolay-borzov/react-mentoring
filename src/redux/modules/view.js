import { combineReducers } from 'redux'
import { createAction } from 'redux-actions'
import { createSelector } from 'reselect'
import { all, put, takeLatest, select } from 'redux-saga/effects'

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

const actionTypes = {
  RE_FETCH_FILMS: `${sliceId}/RE_FETCH_FILMS`
}

// Action Creators

export const fetchFilm = filmSlice.actionCreators.fetchFilm
export const reFetchFilms = createAction(actionTypes.RE_FETCH_FILMS)

// Sagas

/**
 * Updates related films search params and fetches films
 */
function* fetchRelatedFilmsAsync({ payload: film }) {
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

function* watchFilmLoad() {
  yield takeLatest(
    filmSlice.actionTypes.FETCH_FILM_SUCCESS,
    fetchRelatedFilmsAsync
  )
}

function* watchReFetchFilms() {
  yield takeLatest(actionTypes.RE_FETCH_FILMS, fetchRelatedFilmsAsync)
}

export function* viewSagas() {
  yield all([
    filmSlice.sagas(),
    filmsSlice.sagas(),
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
