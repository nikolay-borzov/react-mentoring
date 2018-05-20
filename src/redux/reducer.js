import { combineReducers } from 'redux'
import search from './modules/search'
import view from './modules/view'

const rootReducer = combineReducers({
  search,
  view
})

export default rootReducer
