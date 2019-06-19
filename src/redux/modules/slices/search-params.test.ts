import createSlice from './search-params'
import { GetFilmsParams } from '../../../services/film-service'

const initialState: GetFilmsParams = {
  search: 'Gemini',
  searchBy: 'title',
  sortBy: 'vote_average',
  sortOrder: 'desc',
  limit: 15,
  filter: []
}

const parentState = { searchParams: initialState }

const slice = createSlice({
  id: 'SEARCH_PARAMS',
  rootSelector: (state: any) => state.searchParams,
  initialState
})

describe('SearchParams state slice', () => {
  describe('selectors', () => {
    const state = parentState
    const selectors = slice.selectors

    it(`returns 'search' param`, () => {
      expect(selectors.search(state)).toBe(state.searchParams.search)
    })

    it(`returns 'searchBy' param`, () => {
      expect(selectors.searchBy(state)).toBe(state.searchParams.searchBy)
    })

    it(`returns 'sortBy' param`, () => {
      expect(selectors.sortBy(state)).toBe(state.searchParams.sortBy)
    })

    it(`returns 'filter' param`, () => {
      expect(selectors.filter(state)).toBe(state.searchParams.filter)
    })

    it(`returns search params`, () => {
      expect(selectors.params(state)).toEqual(state.searchParams)
    })
  })

  describe('actions', () => {
    const actionTypes = slice.actionTypes
    const setParams = slice.actionCreators.setParams

    it('creates an action to set search params', () => {
      const payload: GetFilmsParams = {
        search: 'Gemini',
        searchBy: 'title'
      }
      const expectedAction = {
        type: actionTypes.SET_PARAMS,
        payload
      }

      expect(setParams(payload)).toEqual(expectedAction)
    })

    it(`accepts only allowed params`, () => {
      const expectedPayload: GetFilmsParams = {
        search: 'Gemini',
        searchBy: 'title',
        sortBy: 'release_date',
        sortOrder: 'asc',
        limit: 15
      }
      const expectedAction = {
        type: actionTypes.SET_PARAMS,
        payload: expectedPayload
      }
      const payload = {
        ...expectedPayload,
        someParameter: 'someValue'
      }

      expect(setParams(payload)).toEqual(expectedAction)
    })
  })

  describe('reducer', () => {
    const reducer = slice.reducer
    const setParams = slice.actionCreators.setParams

    it('returns initial state', () => {
      expect(
        reducer(undefined, { type: 'UNKNOWN', payload: {} })
      ).toMatchSnapshot()
    })

    it('sets search params', () => {
      const state: GetFilmsParams = { search: '', searchBy: 'title', limit: 20 }
      const action = setParams({
        search: 'Horror',
        searchBy: 'genres'
      })

      expect(reducer(state, action)).toMatchSnapshot()
    })
  })
})
