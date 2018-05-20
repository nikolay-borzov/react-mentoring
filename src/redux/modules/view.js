import { combineReducers } from 'redux'
import { createSelector } from 'reselect'

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

// Action Creators

export const fetchFilm = filmSlice.actionCreators.fetchFilm
export const setRelatedFilmsSearchParams =
  searchParamsSlice.actionCreators.setParams
export const fetchRelatedFilms = filmsSlice.actionCreators.fetchFilms

// Reducer

const rootReducer = combineReducers({
  film: filmSlice.reducer,
  relatedFilms: combineReducers({
    searchParams: searchParamsSlice.reducer,
    films: filmsSlice.reducer
  })
})

export default rootReducer
