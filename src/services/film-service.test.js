import filmService from './film-service'

import axios from 'axios'

import { film, films } from '../../jest/stubs'

jest.mock('axios')

describe('filmService', () => {
  beforeEach(() => {
    axios.get.mockClear()
  })

  it('requests movies', () => {
    const requestParams = {
      params: {
        search: 'Gemini',
        searchBy: 'title',
        sortBy: 'release_date',
        sortOrder: 'desc',
        limit: 15
      }
    }

    const resultExpected = {
      data: films
    }

    axios.get.mockReturnValue(Promise.resolve(resultExpected))

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

    axios.get.mockReturnValue(Promise.resolve(resultExpected))

    filmService.getFilm(id).then(result => {
      expect(axios.get).toHaveBeenCalledWith(`/movies/${id}`)
      expect(result).toBe(resultExpected)
    })
  })
})
