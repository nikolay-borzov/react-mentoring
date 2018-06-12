import { films } from '../../../../jest/stubs'
import { runSaga } from '../../../../jest/test-helpers'

import createSlice from './films'

import filmService from '../../../services/film-service'

jest.mock('../../../services/film-service')

const initialState = {
  films: {
    items: films,
    total: 3000,
    limit: 15,
    error: new Error('Generic error'),
    isFetching: true
  },
  searchParams: {
    search: '',
    searchBy: '',
    sortBy: '',
    sortOrder: '',
    limit: 1,
    filter: []
  }
}

const slice = createSlice({
  id: 'FILMS',
  rootSelector: state => state.films,
  searchParamsSelector: state => state.searchParams,
  initialState: initialState.films
})

describe('Films state slice', () => {
  describe('selectors', () => {
    const state = initialState
    const selectors = slice.selectors

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

  describe('sagas', () => {
    afterEach(() => {
      filmService.getFilms.mockClear()
    })

    it(`fetches films`, () => {
      const response = {
        data: [{ id: 1 }, { id: 2 }],
        total: 3000,
        limit: 15
      }

      const state = {
        films: {},
        searchParams: initialState.searchParams
      }

      filmService.getFilms.mockReturnValue(Promise.resolve(response))

      expect.assertions(2)
      runSaga(slice.sagas.fetchFilmsAsync, state).then(dispatched => {
        expect(dispatched).toEqual([
          slice.actionCreators.fetchFilmsRequest(),
          slice.actionCreators.fetchFilmsSuccess(response)
        ])
        expect(filmService.getFilms).toHaveBeenCalledWith(
          initialState.searchParams
        )
      })
    })

    it(`handles films fetching failure`, () => {
      const expectedError = new Error('Fetch films failure')
      filmService.getFilms.mockReturnValue(Promise.reject(expectedError))

      expect.assertions(1)
      runSaga(slice.sagas.fetchFilmsAsync).then(dispatched => {
        expect(dispatched).toEqual([
          slice.actionCreators.fetchFilmsRequest(),
          slice.actionCreators.fetchFilmsFail(expectedError)
        ])
      })
    })
  })

  describe('reducer', () => {
    const reducer = slice.reducer
    const actionTypes = slice.actionTypes

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
})
