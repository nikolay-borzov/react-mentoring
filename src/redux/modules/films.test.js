import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import reducer, { fetchFilms, actionTypes, selectors } from './films'

import filmService from '../../services/film-service'

jest.mock('../../services/film-service')

const mockStore = configureMockStore([thunk])

describe('selectors', () => {
  const state = {
    films: {
      items: [{ id: 1 }, { id: 2 }],
      total: 3000,
      limit: 15,
      error: new Error('Generic error'),
      isFetching: true
    }
  }

  it(`returns 'items'`, () => {
    expect(selectors.films(state)).toBe(state.films.items)
  })

  it(`returns 'total'`, () => {
    expect(selectors.total(state)).toBe(state.films.total)
  })

  it(`returns 'limit'`, () => {
    expect(selectors.limit(state)).toBe(state.films.limit)
  })

  it(`returns 'isFetching'`, () => {
    expect(selectors.isFetching(state)).toBe(state.films.isFetching)
  })

  it(`returns 'error'`, () => {
    expect(selectors.error(state)).toBe(state.films.error)
  })
})

describe('async actions', () => {
  afterEach(() => {
    filmService.getFilms.mockClear()
  })

  it(`dispatches 'FETCH_FILMS_SUCCESS' when films are fetched`, () => {
    const response = {
      data: [{ id: 1 }, { id: 2 }],
      total: 3000,
      limit: 15
    }
    filmService.getFilms.mockReturnValue(Promise.resolve(response))

    const expectedActions = [
      {
        type: actionTypes.FETCH_FILMS_REQUEST
      },
      {
        type: actionTypes.FETCH_FILMS_SUCCESS,
        payload: {
          data: response.data,
          total: response.total,
          limit: response.limit
        }
      }
    ]

    const store = mockStore({ films: {} })

    return store
      .dispatch(fetchFilms())
      .then(() => expect(store.getActions()).toEqual(expectedActions))
  })

  it(`dispatches 'FETCH_FILMS_FAIL' on films fetch failure`, () => {
    const expectedError = new Error('Fetch films failure')
    filmService.getFilms.mockReturnValue(Promise.reject(expectedError))

    const expectedActions = [
      {
        type: actionTypes.FETCH_FILMS_REQUEST
      },
      {
        type: actionTypes.FETCH_FILMS_FAIL,
        payload: expectedError,
        error: true
      }
    ]

    const store = mockStore({ films: {} })

    expect.assertions(1)

    return store
      .dispatch(fetchFilms())
      .catch(() => expect(store.getActions()).toEqual(expectedActions))
  })
})

describe('reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toMatchSnapshot()
  })

  it(`handles 'FETCH_FILMS_REQUEST'`, () => {
    const state = { isFetching: false }
    const action = {
      type: actionTypes.FETCH_FILMS_REQUEST
    }

    expect(reducer(state, action)).toMatchObject({
      isFetching: true
    })
  })

  it(`handles 'FETCH_FILMS_SUCCESS'`, () => {
    const state = {
      isFetching: true,
      items: [],
      total: 0,
      limit: 15,
      error: 'some error'
    }
    const expectedState = {
      isFetching: false,
      items: [{ id: 1 }],
      total: 3000,
      limit: 15,
      error: null
    }

    const action = {
      type: actionTypes.FETCH_FILMS_SUCCESS,
      payload: {
        data: expectedState.items,
        total: expectedState.total,
        limit: expectedState.limit
      }
    }

    expect(reducer(state, action)).toMatchObject(expectedState)
  })

  it(`it handles 'FETCH_FILMS_FAIL'`, () => {
    const state = {
      isFetching: true,
      error: null
    }
    const expectedState = {
      isFetching: false,
      error: 'some error'
    }
    const action = {
      type: actionTypes.FETCH_FILMS_FAIL,
      payload: 'some error'
    }

    expect(reducer(state, action)).toMatchObject(expectedState)
  })
})
