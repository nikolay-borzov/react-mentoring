import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import { film, films } from '../../../jest/stubs'

import { FilmContainer } from './film-container'

import filmService from '../../services/film-service'
import { toast } from 'react-toastify'

jest.mock('../../services/film-service')

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn()
  }
}))

// TODO: Mock ContentImage component https://medium.com/xebia/de-mystifying-jest-snapshot-test-mocks-8e7183d109ea

describe('FilmContainer page component', () => {
  const getFilmsResponse = {
    data: films
  }

  let props = {
    filmId: film.id
  }

  const render = () => {
    const wrapper = shallow(<FilmContainer {...props} />)

    return { wrapper, instance: wrapper.instance() }
  }

  beforeEach(() => {
    filmService.getFilm.mockClear()
    filmService.getFilms.mockClear()
  })

  describe('it renders correctly', () => {
    let tree

    beforeEach(() => {
      filmService.getFilm.mockReturnValue(Promise.resolve(film))
      filmService.getFilms.mockReturnValue(Promise.resolve(getFilmsResponse))
      tree = renderer.create(<FilmContainer {...props} />)
    })

    it('when film and relatedFilms are provided', () => {
      // TODO: Perhaps there is a better way to get data rendered
      // https://github.com/facebook/jest/issues/2157
      // Set data directly to avoid waiting for promise resolving
      tree.root.instance.setState({
        film,
        isFilmLoaded: true,
        relatedFilms: films,
        isRelatedFilmsLoaded: true
      })

      // TODO: Mock ContentImage
      expect(tree.toJSON()).toMatchSnapshot()
    })

    it('when the film is unavailable', () => {
      tree.root.instance.setState({
        film: null,
        isFilmLoaded: true,
        relatedFilms: films,
        isRelatedFilmsLoaded: true
      })

      expect(tree.toJSON()).toMatchSnapshot()
    })
  })

  it('loads a film by id and related films by genre', () => {
    filmService.getFilm.mockReturnValue(Promise.resolve(film))

    const { wrapper, instance } = render()

    expect(filmService.getFilm).toHaveBeenCalled()

    return instance.loadFilm(film.id).then(() => {
      const state = wrapper.state()

      expect(state.film).toBe(film)
      expect(state.genre).toBe(film.genres[0])
      expect(state.isFilmLoaded).toBe(true)

      expect(filmService.getFilms).toHaveBeenCalled()
    })
  })

  it('displays error when unable to load the film', async () => {
    const error = new Error('Film load error')
    filmService.getFilm.mockReturnValue(Promise.reject(error))

    const { wrapper, instance } = render()

    expect.assertions(2)

    return instance.loadFilm(film.id).then(() => {
      expect(toast.error).toHaveBeenCalled()
      expect(wrapper.state().isFilmLoaded).toBe(true)
    })
  })

  it('loads related films by genre', () => {
    filmService.getFilm.mockReturnValue(Promise.resolve(film))
    filmService.getFilms.mockReturnValue(Promise.resolve(getFilmsResponse))

    const { wrapper, instance } = render()

    return instance.loadRelatedFilms(film.genres[0]).then(() => {
      const state = wrapper.state()

      expect(filmService.getFilms).toHaveBeenCalledWith(instance.queryParams)

      expect(state.relatedFilms).toBe(films)
      expect(state.isRelatedFilmsLoaded).toBe(true)
    })
  })

  it('displays error when unable to load related films', async () => {
    const error = new Error('Films load error')
    filmService.getFilms.mockReturnValue(Promise.reject(error))

    const { wrapper, instance } = render()

    expect.assertions(2)

    return instance.loadRelatedFilms(film.genres[0]).then(() => {
      expect(toast.error).toHaveBeenCalled()
      expect(wrapper.state().isRelatedFilmsLoaded).toBe(true)
    })
  })
})
