import { createSelector } from 'reselect'
import { createActionCreator, createReducer, getType, ActionType } from 'deox'
import { all, call, put, takeLatest } from 'redux-saga/effects'

import filmService from '../../../services/film-service'
import { Film } from '../../../entities/film'

export interface FilmState {
  item?: Film
  error?: Error
  isFetching: boolean
}

type State = FilmState

interface CreateFilmSliceParams {
  id: string
  initialState?: State
  rootSelector(state: any): State
}

export default function createFilmSlice(params: CreateFilmSliceParams) {
  const {
    id,
    rootSelector,
    initialState = {
      isFetching: false
    }
  } = params

  // Selectors

  const filmSelector = createSelector(
    rootSelector,
    film => film.item
  )
  const errorSelector = createSelector(
    rootSelector,
    film => film.error
  )
  const isFetchingSelector = createSelector(
    rootSelector,
    film => film.isFetching
  )

  const selectors = {
    film: filmSelector,
    error: errorSelector,
    isFetching: isFetchingSelector
  }

  // Action Types

  const actionTypes = {
    FETCH_FILM: `${id}/FETCH_FILM`,
    FETCH_FILM_REQUEST: `${id}/FETCH_FILM_REQUEST`,
    FETCH_FILM_SUCCESS: `${id}/FETCH_FILM_SUCCESS`,
    FETCH_FILM_FAIL: `${id}/FETCH_FILM_FAIL`
  }

  // Action Creators

  // TODO: Why `fetchFilm` and `fetchFilmRequest` cannot be combined into one action
  const fetchFilm = createActionCreator(
    actionTypes.FETCH_FILM,
    resolve => (id: number) => resolve(id)
  )
  const fetchFilmRequest = createActionCreator(actionTypes.FETCH_FILM_REQUEST)
  const fetchFilmSuccess = createActionCreator(
    actionTypes.FETCH_FILM_SUCCESS,
    resolve => (film: Film) => resolve(film)
  )
  const fetchFilmFail = createActionCreator(
    actionTypes.FETCH_FILM_FAIL,
    resolve => (error: Error) => resolve(error)
  )

  // Sagas

  function* watchFetchFilm() {
    yield takeLatest(getType(fetchFilm), fetchFilmAsync)
  }

  function* fetchFilmAsync({ payload: id }: ActionType<typeof fetchFilm>) {
    try {
      yield put(fetchFilmRequest())

      const result = yield call(filmService.getFilm, id)

      yield put(fetchFilmSuccess(result))
    } catch (error) {
      /* istanbul ignore next */
      if (IS_DEVELOPMENT || IS_SERVER) {
        console.log('fetch film failed', error)
      }

      yield put(fetchFilmFail(error))
    }
  }

  // Reducer

  const reducer = createReducer(initialState, handleAction => [
    handleAction(fetchFilmRequest, state => ({ ...state, isFetching: true })),
    handleAction(fetchFilmSuccess, (state, { payload }) => ({
      ...state,
      item: payload,
      error: undefined,
      isFetching: false
    })),
    handleAction(fetchFilmFail, (state, { payload }) => ({
      ...state,
      error: payload,
      isFetching: false
    }))
  ])

  return {
    selectors,
    actionTypes,
    actionCreators: {
      fetchFilm,
      fetchFilmRequest,
      fetchFilmSuccess,
      fetchFilmFail
    },
    reducer,
    sagas: {
      fetchFilmAsync,
      watchFetchFilm
    },
    getSagas: function*() {
      yield all([watchFetchFilm()])
    }
  }
}
