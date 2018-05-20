import { combineReducers } from 'redux'

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

// Reducer

const rootReducer = combineReducers({
  searchParams: searchParamsSlice.reducer,
  films: filmsSlice.reducer
})

export default rootReducer
