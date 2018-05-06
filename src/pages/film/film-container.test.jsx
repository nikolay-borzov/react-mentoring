import React from 'react'
// import { shallow } from 'enzyme'

import { itRendersCorrectly } from '../../../jest/test-helpers'

import { FilmContainer } from './film-container'

import { filmService } from '../../services/film-service'
// import { toast } from 'react-toastify'

jest.mock('../../services/film-service')
jest.mock('react-toastify', () => ({
  toast: {
    error: function() {
      console.log('from mock')
    }
  }
}))

describe('FilmContainer page component', () => {
  const film = {
    id: 1,
    title: 'Film title',
    poster_path: '//content/posters/1.png',
    overview: 'Film overview',
    release_date: '2018-05-04',
    genres: ['some genre', 'another genre']
  }

  const getFilmsResponse = {
    data: [film]
  }

  let props = {
    filmId: '1'
  }

  beforeEach(() => {
    // filmService.mockClear()

    filmService.getFilms.mockReturnValue(Promise.resolve(getFilmsResponse))
  })

  itRendersCorrectly(() => {
    filmService.getFilm.mockReturnValue(Promise.resolve(film))

    return <FilmContainer {...props} />
  })

  // TODO Figure out how to test toast.error call
  /*   it.only('displays error if cannot load the film', () => {
    filmService.getFilm.mockReturnValue(Promise.reject(film))
    shallow(<FilmContainer {...props} />)
    // console.log(toast.error)
    expect(toast.error).toHaveBeenCalled()
  }) */
})
