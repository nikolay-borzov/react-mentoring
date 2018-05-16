import reducer, { setParams, actionTypes, selectors } from './search'

describe('selectors', () => {
  const state = {
    search: {
      search: '',
      searchBy: 'Gemini',
      sortBy: 'title',
      sortOrder: 'desc',
      limit: 15
    }
  }

  it(`returns 'search' param`, () => {
    expect(selectors.search(state)).toBe(state.search.search)
  })

  it(`returns 'searchBy' param`, () => {
    expect(selectors.searchBy(state)).toBe(state.search.searchBy)
  })

  it(`returns 'sortBy' param`, () => {
    expect(selectors.sortBy(state)).toBe(state.search.sortBy)
  })

  it(`returns search params`, () => {
    expect(selectors.params(state)).toBe(state.search)
  })
})

describe('actions', () => {
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

  it(`accepts only 'search', 'searchBy' and 'sortBy' params`, () => {
    const payload = {
      search: 'Gemini',
      searchBy: 'title',
      sortOrder: 'asc'
    }
    const expectedAction = {
      type: actionTypes.SET_PARAMS,
      payload: {
        search: 'Gemini',
        searchBy: 'title'
      }
    }

    expect(setParams(payload)).toEqual(expectedAction)
  })
})

describe('reducer', () => {
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
