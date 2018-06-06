import { combineReducers } from 'redux'
// import { persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import { all } from 'redux-saga/effects'

import { searchBy, sortBy, sortOrder } from '../../enums'

import createSearchParamsSlice from './slices/search-params'
import createFilmsSlice from './slices/films'

/* State Shape
  {
    searchParams: {},
    films: {}
  }
*/

const sliceId = 'SEARCH'

const searchParamsSlice = createSearchParamsSlice({
  id: sliceId,
  rootSelector: state => state.search.searchParams,
  initialState: {
    search: '',
    searchBy: searchBy.title,
    sortBy: sortBy.releaseDate,
    sortOrder: sortOrder.desc,
    limit: 15,
    filter: []
  }
})

const filmsSlice = createFilmsSlice({
  id: sliceId,
  rootSelector: state => state.search.films,
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
  yield all([filmsSlice.sagas()])
}

// Reducer

/* const searchParamsPersistConfig = {
  key: 'search.searchParams',
  storage
} */

const rootReducer = combineReducers({
  // TODO: Disable until we can render PersistGate on server side
  /*  searchParams: persistReducer(
    searchParamsPersistConfig,
    searchParamsSlice.reducer
  ), */
  searchParams: searchParamsSlice.reducer,
  films: filmsSlice.reducer
})

export default rootReducer
