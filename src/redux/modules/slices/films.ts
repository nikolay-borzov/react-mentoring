import { createActionCreator, createReducer, getType } from 'deox'
import { createSelector } from 'reselect'
import { all, call, put, select, takeLatest } from 'redux-saga/effects'

import filmService, {
  GetFilmsParams,
  DataResponse
} from '../../../services/film-service'
import { Film } from '../../../entities/film'

export interface FilmsState {
  items: Film[]
  total: number
  limit: number
  isFetching: boolean
  error?: Error
}

type State = FilmsState

interface CreateFilmsSliceParams {
  id: string
  initialState?: State
  rootSelector(parentState: any): State
  searchParamsSelector(parentState: any): GetFilmsParams
}

export default function createFilmsSlice(params: CreateFilmsSliceParams) {
  const {
    id,
    initialState = {
      items: [],
      total: 0,
      limit: 0,
      isFetching: false
    },
    rootSelector,
    searchParamsSelector
  } = params

  // Selectors

  const filmsSelector = createSelector(
    rootSelector,
    films => films.items
  )
  const totalSelector = createSelector(
    rootSelector,
    films => films.total
  )
  const limitSelector = createSelector(
    rootSelector,
    films => films.limit
  )
  const errorSelector = createSelector(
    rootSelector,
    films => films.error
  )
  const isFetchingSelector = createSelector(
    rootSelector,
    films => films.isFetching
  )

  const selectors = {
    films: filmsSelector,
    total: totalSelector,
    limit: limitSelector,
    error: errorSelector,
    isFetching: isFetchingSelector
  }

  // Action Types

  const actionTypes = {
    FETCH_FILMS: `${id}/FETCH_FILMS`,
    FETCH_FILMS_REQUEST: `${id}/FETCH_FILMS_REQUEST`,
    FETCH_FILMS_SUCCESS: `${id}/FETCH_FILMS_SUCCESS`,
    FETCH_FILMS_FAIL: `${id}/FETCH_FILMS_FAIL`
  }

  // Action Creators

  const fetchFilms = createActionCreator(actionTypes.FETCH_FILMS)
  const fetchFilmsRequest = createActionCreator(actionTypes.FETCH_FILMS_REQUEST)
  const fetchFilmsSuccess = createActionCreator(
    actionTypes.FETCH_FILMS_SUCCESS,
    resolve => (response: DataResponse<Film>) => resolve(response)
  )
  const fetchFilmsFail = createActionCreator(
    actionTypes.FETCH_FILMS_FAIL,
    resolve => (error: Error) => resolve(error)
  )

  // Sagas

  function* watchFetchFilms() {
    // TODO: For some reason we cannot use the same action for watcher and for reducer?
    yield takeLatest(getType(fetchFilms), fetchFilmsAsync)
  }

  function* fetchFilmsAsync() {
    try {
      yield put(fetchFilmsRequest())

      const searchParams: GetFilmsParams = yield select(searchParamsSelector)
      const result: DataResponse<Film> = yield call(
        filmService.getFilms,
        searchParams
      )

      yield put(fetchFilmsSuccess(result))
    } catch (error) {
      /* istanbul ignore next */
      if (IS_DEVELOPMENT || IS_SERVER) {
        console.log('fetch films failed', error)
      }

      yield put(fetchFilmsFail(error))
    }
  }

  // Reducer

  const reducer = createReducer(initialState, handleAction => [
    handleAction(fetchFilmsRequest, state => ({
      ...state,
      isFetching: true
    })),

    handleAction(fetchFilmsSuccess, (state, { payload }) => ({
      ...state,
      items: payload.data,
      total: payload.total,
      limit: payload.limit,
      error: undefined,
      isFetching: false
    })),

    handleAction(fetchFilmsFail, (state, { payload }) => ({
      ...state,
      error: payload,
      isFetching: false
    }))
  ])

  return {
    selectors,
    actionTypes,
    actionCreators: {
      fetchFilms,
      fetchFilmsRequest,
      fetchFilmsSuccess,
      fetchFilmsFail
    },
    reducer,
    sagas: {
      fetchFilmsAsync,
      watchFetchFilms
    },
    getSagas: function*() {
      yield all([watchFetchFilms()])
    }
  }
}
