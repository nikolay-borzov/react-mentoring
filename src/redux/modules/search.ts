import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'

import createSearchParamsSlice, {
  SearchParamsState
} from './slices/search-params'
import createFilmsSlice, { FilmsState } from './slices/films'
import { AppState } from '../reducer'

export interface SearchState {
  searchParams: SearchParamsState
  films: FilmsState
}

const sliceId = 'SEARCH'

const searchParamsSlice = createSearchParamsSlice({
  id: sliceId,
  rootSelector: (state: AppState) => state.search.searchParams,
  initialState: {
    search: '',
    searchBy: 'title',
    sortBy: 'release_date',
    sortOrder: 'desc',
    limit: 15,
    filter: []
  }
})

const filmsSlice = createFilmsSlice({
  id: sliceId,
  rootSelector: (state: AppState) => state.search.films,
  searchParamsSelector: searchParamsSlice.selectors.params
})

// Selectors

export const selectors = {
  searchParams: searchParamsSlice.selectors,
  films: filmsSlice.selectors
}

// Action Creators

export const setParams = searchParamsSlice.actionCreators.setParams
export const fetchFilms = filmsSlice.actionCreators.fetchFilms

// Sagas

export function* searchSagas() {
  yield all([filmsSlice.getSagas()])
}

// Reducer

const rootReducer = combineReducers({
  searchParams: searchParamsSlice.reducer,
  films: filmsSlice.reducer
})

export default rootReducer
