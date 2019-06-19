import React from 'react'
import { shallow } from 'enzyme'
import { toast } from 'react-toastify'

import { film, films } from '../../../jest/stubs'
import { itRendersCorrectlyShallow } from '../../../jest/test-helpers'

import FilmContainerConnected, {
  FilmContainer,
  FilmContainerProps
} from './film-container'
import configureStore from '../../redux/create'

jest.mock('../../services/film-service')

describe('FilmContainer page component', () => {
  const fetchFilmMock = jest.fn()
  const reFetchFilmsMock = jest.fn()

  let props: FilmContainerProps = {
    match: {
      params: {
        id: film.id.toString()
      }
    },
    film: undefined,
    filmIsFetching: false,
    filmError: undefined,
    genre: 'Horror',
    relatedFilms: films,
    relatedFilmsIsFetching: false,
    relatedFilmsError: undefined,
    fetchFilm: fetchFilmMock,
    reFetchFilms: reFetchFilmsMock
  }

  const render = () => {
    const wrapper = shallow<FilmContainer>(<FilmContainer {...props} />)

    return { instance: wrapper.instance(), wrapper }
  }

  beforeEach(() => {
    fetchFilmMock.mockClear()
    reFetchFilmsMock.mockClear()

    props.film = film
    props.filmError = undefined
    props.relatedFilms = films
    props.relatedFilmsError = undefined
  })

  afterEach(() => {
    global.IS_SERVER = false
  })

  describe('renders correctly', () => {
    // TODO: Disabled due to type error or passing store as prop isn't working anymore
    /* itRendersCorrectlyShallow(() => {
      const { store } = configureStore()
      return <FilmContainerConnected store={store} />
    }, 'when connected to the store') */

    itRendersCorrectlyShallow(
      () => <FilmContainer {...props} />,
      'when film and relatedFilms are provided'
    )

    itRendersCorrectlyShallow(() => {
      props.film = undefined
      return <FilmContainer {...props} />
    }, 'when the film is unavailable')

    itRendersCorrectlyShallow(() => {
      props.film = {} as any
      return <FilmContainer {...props} />
    }, 'when the film is not found')

    itRendersCorrectlyShallow(() => {
      props.relatedFilms = []
      return <FilmContainer {...props} />
    }, 'when no related films found')

    itRendersCorrectlyShallow(() => {
      props.relatedFilms = []
      props.relatedFilmsError = new Error('Load error')
      return <FilmContainer {...props} />
    }, 'when related films had failed to load')

    itRendersCorrectlyShallow(() => {
      props.film = undefined
      props.relatedFilms = []
      return <FilmContainer {...props} />
    }, 'when no film found nor related films found ')
  })

  it('loads film on sever side', () => {
    global.IS_SERVER = true

    render()

    expect(fetchFilmMock).toHaveBeenCalledWith(film.id)
  })

  it('re-fetches films if film already loaded', () => {
    props.film = film

    render()

    expect(reFetchFilmsMock).toHaveBeenCalled()
  })

  it(`loads film on client side if it isn't loaded yet`, () => {
    props.film = undefined

    render()

    expect(fetchFilmMock).toHaveBeenCalledWith(film.id)
  })

  it('loads a film if id has changed', () => {
    const { wrapper, instance } = render()
    // Clear initial call
    fetchFilmMock.mockClear()

    wrapper.setProps({ match: { params: { id: (film.id + 1).toString() } } })
    // https://github.com/airbnb/enzyme/issues/34
    instance.componentDidUpdate(props)

    expect(fetchFilmMock).toHaveBeenCalled()
  })

  it(`doesn't load a film if id hasn't changed`, () => {
    const { wrapper, instance } = render()
    fetchFilmMock.mockClear()

    wrapper.setProps({ genre: 'Drama' })
    instance.componentDidUpdate(props)

    expect(fetchFilmMock).not.toHaveBeenCalled()
  })

  it('displays an error when unable to load the film', () => {
    const error = new Error('Film load error')

    const { wrapper, instance } = render()

    wrapper.setProps({ filmError: error })
    instance.componentDidUpdate(props)

    expect(toast.error).toHaveBeenCalled()
  })

  it('displays error when unable to load related films', () => {
    const error = new Error('Films load error')

    const { wrapper, instance } = render()

    wrapper.setProps({ relatedFilmsError: error })
    instance.componentDidUpdate(props)

    expect(toast.error).toHaveBeenCalled()
  })
})
