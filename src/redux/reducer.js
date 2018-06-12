import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'

import search, { searchSagas } from './modules/search'
import view, { viewSagas } from './modules/view'

const rootReducer = combineReducers({
  search,
  view
})

export function* rootSaga() {
  yield all([searchSagas(), viewSagas()])
}

export default rootReducer
