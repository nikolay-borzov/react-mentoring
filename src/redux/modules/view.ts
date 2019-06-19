import { combineReducers } from 'redux'
import { createActionCreator, ActionType, getType } from 'deox'
import { createSelector } from 'reselect'
import { all, put, takeLatest, select } from 'redux-saga/effects'

import createFilmSlice, { FilmState } from './slices/film'
import createSearchParamsSlice, {
  SearchParamsState
} from './slices/search-params'
import createFilmsSlice, { FilmsState } from './slices/films'
import { Film } from '../../entities/film'
import { AppState } from '../reducer'

export interface ViewState {
  film: FilmState
  relatedFilms: {
    films: FilmsState
    searchParams: SearchParamsState
  }
}

const sliceId = 'VIEW'

/* Slices */

const relatedFilmsSelector = (state: AppState) => state.view.relatedFilms

const filmSlice = createFilmSlice({
  id: sliceId,
  rootSelector: (state: AppState) => state.view.film
})

const searchParamsSlice = createSearchParamsSlice({
  id: sliceId,
  rootSelector: createSelector(
    relatedFilmsSelector,
    relatedFilms => relatedFilms.searchParams
  ),
  initialState: {
    search: '',
    searchBy: 'genres',
    sortBy: 'vote_average',
    sortOrder: 'desc',
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
export const reFetchFilms = createActionCreator(actionTypes.RE_FETCH_FILMS)

// for tests
export const setParams = searchParamsSlice.actionCreators.setParams
export const fetchFilms = filmsSlice.actionCreators.fetchFilms

// Sagas

export function* watchFilmLoad() {
  yield takeLatest(
    getType(filmSlice.actionCreators.fetchFilmSuccess),
    fetchRelatedFilmsAsync
  )
}

export function* watchReFetchFilms() {
  yield takeLatest(getType(reFetchFilms), fetchRelatedFilmsAsync)
}

/**
 * Updates related films search params and fetches films
 */
export function* fetchRelatedFilmsAsync(
  action: ActionType<typeof filmSlice.actionCreators.fetchFilmSuccess>
) {
  const film: Film =
    action.payload !== undefined
      ? action.payload
      : yield select(filmSlice.selectors.film)

  // TODO: When `id` might not be set?
  if (film.id) {
    yield put(
      searchParamsSlice.actionCreators.setParams({
        search: film.genres[0]
      })
    )

    yield put(filmsSlice.actionCreators.fetchFilms())
  }
}

export function* viewSagas() {
  yield all([
    watchFilmLoad(),
    watchReFetchFilms(),
    filmSlice.getSagas(),
    filmsSlice.getSagas()
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
