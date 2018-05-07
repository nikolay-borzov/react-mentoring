import filmService from './film-service'

import { QueryParams } from '../entities/query-params'

import axios from 'axios'

import { film, films } from '../../jest/stubs'

jest.mock('axios')

describe('filmService', () => {
  beforeEach(() => {
    axios.get.mockClear()
  })

  it('requests movies', () => {
    const queryParams = new QueryParams()
    const requestParams = {
      params: queryParams.getParams()
    }

    axios.get.mockReturnValue(Promise.resolve({ data: films }))

    filmService.getFilms(queryParams).then(result => {
      expect(axios.get).toHaveBeenCalledWith('/movies', requestParams)
      expect(result).toBe(films)
    })
  })

  it('requests movie by id', () => {
    const id = 1

    axios.get.mockReturnValue(Promise.resolve({ data: film }))

    filmService.getFilm(id).then(result => {
      expect(axios.get).toHaveBeenCalledWith(`/movies/${id}`)
      expect(result).toBe(film)
    })
  })
})
