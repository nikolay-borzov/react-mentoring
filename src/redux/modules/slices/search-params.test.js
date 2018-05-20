import createSlice from './search-params'

const initialState = {
  searchParams: {
    search: 'Gemini',
    searchBy: 'title',
    sortBy: 'vote_average',
    sortOrder: 'desc',
    limit: 15,
    filter: []
  }
}

const slice = createSlice({
  id: 'SEARCH_PARAMS',
  rootSelector: state => state.searchParams,
  initialState: initialState.searchParams
})

describe('SearchParams state slice', () => {
  describe('selectors', () => {
    const state = initialState
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
      const payload = {
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
      const expectedPayload = {
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
      expect(reducer(undefined, {})).toMatchSnapshot()
    })

    it('sets search params', () => {
      const state = { search: '', searchBy: 'genre', limit: 20 }
      const action = setParams({
        search: 'Horror',
        searchBy: 'genre'
      })

      expect(reducer(state, action)).toMatchSnapshot()
    })
  })
})
