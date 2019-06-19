import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'

import search, { searchSagas, SearchState } from './modules/search'
import view, { viewSagas, ViewState } from './modules/view'

export interface AppState {
  search: SearchState
  view: ViewState
}

const rootReducer = combineReducers({
  search,
  view
})

export function* rootSaga() {
  yield all([searchSagas(), viewSagas()])
}

export default rootReducer
