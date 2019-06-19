import filmService, { GetFilmsParams } from './film-service'

import axios, { AxiosStatic } from 'axios'

import { film, films } from '../../jest/stubs'

jest.mock('axios')

describe('filmService', () => {
  const axiosGetMock = axios.get as jest.Mock

  beforeEach(() => {
    axiosGetMock.mockClear()
  })

  it('requests movies', () => {
    const requestParams = {
      params: {
        search: 'Gemini',
        searchBy: 'title',
        sortBy: 'release_date',
        sortOrder: 'desc',
        limit: 15
      } as GetFilmsParams
    }

    const resultExpected = {
      data: films
    }

    axiosGetMock.mockReturnValue(Promise.resolve(resultExpected))

    filmService.getFilms(requestParams.params).then(result => {
      expect(axios.get).toHaveBeenCalledWith('/movies', requestParams)
      expect(result).toBe(resultExpected)
    })
  })

  it('requests movie by id', () => {
    const id = 1

    const resultExpected = {
      data: film
    }

    axiosGetMock.mockReturnValue(Promise.resolve(resultExpected))

    filmService.getFilm(id).then(result => {
      expect(axios.get).toHaveBeenCalledWith(`/movies/${id}`)
      expect(result).toBe(resultExpected)
    })
  })
})
