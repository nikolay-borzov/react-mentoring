import { takeLatest } from 'redux-saga/effects'

import {
  fetchRelatedFilmsAsync,
  watchFilmLoad,
  watchReFetchFilms,
  actionTypes,
  setParams,
  fetchFilms
} from './view'

import { film } from '../../../jest/stubs'
import { runSaga } from '../../../jest/test-helpers'

describe('view redux module', () => {
  it('fetches related films on FETCH_FILM_SUCCESS', () => {
    const iterator = watchFilmLoad()

    const expectedYield = takeLatest(
      actionTypes.FETCH_FILM_SUCCESS,
      fetchRelatedFilmsAsync
    )

    const actualYield = iterator.next().value

    expect(actualYield).toEqual(expectedYield)
  })

  it('fetches related films on RE_FETCH_FILMS', () => {
    const iterator = watchReFetchFilms()
    const expectedYield = takeLatest(
      actionTypes.RE_FETCH_FILMS,
      fetchRelatedFilmsAsync
    )

    const actualYield = iterator.next().value

    expect(actualYield).toEqual(expectedYield)
  })

  it('fetches related films by genre taking film from payload', () => {
    const action = { payload: film }

    expect.assertions(1)
    runSaga(fetchRelatedFilmsAsync, {}, action).then(dispatched => {
      expect(dispatched).toEqual([
        setParams({
          search: film.genres[0]
        }),
        fetchFilms()
      ])
    })
  })

  it('fetches related films by genre taking film from the store', () => {
    const state = {
      view: {
        film: {
          item: film
        }
      }
    }

    return runSaga(fetchRelatedFilmsAsync, state, {}).then(dispatched => {
      expect(dispatched).toEqual([
        setParams({
          search: film.genres[0]
        }),
        fetchFilms()
      ])
    })
  })

  it('does not fetches related films only film was not found', () => {
    const action = { payload: { id: null } }

    expect.assertions(1)
    runSaga(fetchRelatedFilmsAsync, {}, action).then(dispatched => {
      expect(dispatched).toHaveLength(0)
    })
  })
})
