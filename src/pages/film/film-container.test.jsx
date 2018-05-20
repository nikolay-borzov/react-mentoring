import React from 'react'
import { shallow } from 'enzyme'
import { toast } from 'react-toastify'

import { film, films } from '../../../jest/stubs'
import { itRendersCorrectlyShallow } from '../../../jest/test-helpers'

import FilmContainerConnected, { FilmContainer } from './film-container'
import configureStore from '../../redux/create'

jest.mock('../../services/film-service')

describe('FilmContainer page component', () => {
  const fetchFilmMock = jest.fn()
  const setRelatedFilmsSearchParamsMock = jest.fn()
  const fetchRelatedFilmsMock = jest.fn()

  let props = {
    filmId: film.id,
    film,
    filmIsFetching: false,
    genre: 'Horror',
    relatedFilms: films,
    relatedFilmsIsFetching: false,
    relatedFilmsError: null,
    fetchFilm: fetchFilmMock,
    setRelatedFilmsSearchParams: setRelatedFilmsSearchParamsMock,
    fetchRelatedFilms: fetchRelatedFilmsMock
  }

  const render = () => {
    const wrapper = shallow(<FilmContainer {...props} />)

    return { instance: wrapper.instance() }
  }

  beforeEach(() => {
    fetchFilmMock.mockClear()
    setRelatedFilmsSearchParamsMock.mockClear()
    fetchRelatedFilmsMock.mockClear()

    props.film = film
    props.relatedFilms = films
    props.relatedFilmsError = null

    fetchFilmMock.mockReturnValue(Promise.resolve())
    fetchRelatedFilmsMock.mockReturnValue(Promise.resolve())
  })

  describe('renders correctly', () => {
    itRendersCorrectlyShallow(() => {
      const store = configureStore()
      return <FilmContainerConnected filmId={film.id} store={store} />
    }, 'when connected to the store')

    itRendersCorrectlyShallow(
      () => <FilmContainer {...props} />,
      'when film and relatedFilms are provided'
    )

    itRendersCorrectlyShallow(() => {
      props.film = null
      return <FilmContainer {...props} />
    }, 'when the film is unavailable')

    itRendersCorrectlyShallow(() => {
      props.relatedFilms = []
      return <FilmContainer {...props} />
    }, 'when no related films found')

    itRendersCorrectlyShallow(() => {
      props.relatedFilms = []
      props.relatedFilmsError = new Error('Load error')
      return <FilmContainer {...props} />
    }, 'when no related films failed to load')
  })

  it('loads a film by id and related films by genre', () => {
    const { instance } = render()

    expect(fetchFilmMock).toHaveBeenCalledWith(film.id)

    fetchRelatedFilmsMock.mockClear()
    setRelatedFilmsSearchParamsMock.mockClear()

    expect.assertions(3)

    return instance.loadFilm(film.id).then(() => {
      expect(setRelatedFilmsSearchParamsMock).toHaveBeenCalledWith({
        search: film.genres[0]
      })
      expect(fetchRelatedFilmsMock).toHaveBeenCalled()
    })
  })

  it('displays an error when unable to load the film', async () => {
    const error = new Error('Film load error')
    fetchFilmMock.mockReturnValue(Promise.reject(error))

    const { instance } = render()

    expect.assertions(1)

    return instance.loadFilm(film.id).then(() => {
      expect(toast.error).toHaveBeenCalled()
    })
  })

  it('loads related films by genre', () => {
    fetchFilmMock.mockReturnValue(Promise.resolve())
    fetchRelatedFilmsMock.mockReturnValue(Promise.resolve())

    const { instance } = render()

    expect.assertions(1)
    // Clear initial call
    fetchRelatedFilmsMock.mockClear()
    return instance.loadRelatedFilms(film.genres[0]).then(() => {
      expect(fetchRelatedFilmsMock).toHaveBeenCalled()
    })
  })

  it('displays error when unable to load related films', async () => {
    const error = new Error('Films load error')
    fetchRelatedFilmsMock.mockReturnValue(Promise.reject(error))

    const { instance } = render()

    expect.assertions(1)

    return instance.loadRelatedFilms(film.genres[0]).then(() => {
      expect(toast.error).toHaveBeenCalled()
    })
  })
})
