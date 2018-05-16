import { combineReducers } from 'redux'
import search from './modules/search'
import films from './modules/films'

const rootReducer = combineReducers({
  search,
  films
})

export default rootReducer
