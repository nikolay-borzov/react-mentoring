import { film } from '../../../../jest/stubs'
import { getMockStore } from '../../../../jest/test-helpers'

import createSlice from './film'

import filmService from '../../../services/film-service'

jest.mock('../../../services/film-service')

const mockStore = getMockStore()

const initialState = {
  film: {
    item: film,
    error: new Error('Film load error'),
    isFetching: false
  }
}

const slice = createSlice({
  id: 'FILM',
  rootSelector: state => state.film,
  initialState: initialState.film
})

describe('Film state slice', () => {
  describe('selectors', () => {
    const state = initialState
    const selectors = slice.selectors

    it(`returns 'film'`, () => {
      expect(selectors.film(state)).toBe(state.film.item)
    })

    it(`returns 'error'`, () => {
      expect(selectors.error(state)).toBe(state.film.error)
    })

    it(`returns 'isFetching'`, () => {
      expect(selectors.isFetching(state)).toBe(state.film.isFetching)
    })
  })

  describe('async actions', () => {
    const actionTypes = slice.actionTypes

    afterEach(() => {
      filmService.getFilms.mockClear()
    })

    it(`dispatches 'FETCH_FILM_SUCCESS' when film is fetched`, () => {
      const response = film
      const fetchFilm = slice.actionCreators.fetchFilm

      filmService.getFilm.mockReturnValue(Promise.resolve(response))

      const expectedActions = [
        {
          type: actionTypes.FETCH_FILM_REQUEST
        },
        {
          type: actionTypes.FETCH_FILM_SUCCESS,
          payload: response
        }
      ]

      const store = mockStore(initialState)

      return store
        .dispatch(fetchFilm(film.id))
        .then(() => expect(store.getActions()).toEqual(expectedActions))
    })

    it(`dispatches 'FETCH_FILMS_FAIL' on film fetch failure`, () => {
      const expectedError = new Error('Fetch films failure')
      const fetchFilm = slice.actionCreators.fetchFilm

      filmService.getFilm.mockReturnValue(Promise.reject(expectedError))

      const expectedActions = [
        {
          type: actionTypes.FETCH_FILM_REQUEST
        },
        {
          type: actionTypes.FETCH_FILM_FAIL,
          payload: expectedError,
          error: true
        }
      ]

      const store = mockStore(initialState)

      expect.assertions(1)

      return store
        .dispatch(fetchFilm(film.id))
        .catch(() => expect(store.getActions()).toEqual(expectedActions))
    })
  })

  describe('reducer', () => {
    const reducer = slice.reducer
    const actionTypes = slice.actionTypes

    it('returns initial state', () => {
      expect(reducer(undefined, {})).toMatchSnapshot()
    })

    it(`handles 'FETCH_FILM_REQUEST'`, () => {
      const state = { isFetching: false }
      const action = {
        type: actionTypes.FETCH_FILM_REQUEST
      }

      expect(reducer(state, action)).toMatchObject({
        isFetching: true
      })
    })

    it(`handles 'FETCH_FILM_SUCCESS'`, () => {
      const state = {
        isFetching: true,
        item: null,
        error: 'some error'
      }
      const expectedState = {
        isFetching: false,
        item: { id: 1 },
        error: null
      }

      const action = {
        type: actionTypes.FETCH_FILM_SUCCESS,
        payload: expectedState.item
      }

      expect(reducer(state, action)).toMatchObject(expectedState)
    })

    it(`it handles 'FETCH_FILM_FAIL'`, () => {
      const state = {
        isFetching: true,
        error: null
      }
      const expectedState = {
        isFetching: false,
        error: new Error('some error')
      }
      const action = {
        type: actionTypes.FETCH_FILM_FAIL,
        payload: expectedState.error
      }

      expect(reducer(state, action)).toMatchObject(expectedState)
    })
  })
})
