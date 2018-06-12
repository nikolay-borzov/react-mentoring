import React from 'react'
import { shallow } from 'enzyme'
import { toast } from 'react-toastify'

import SearchContainerConnected, { SearchContainer } from './search-container'
import configureStore from '../../redux/create'

import { films } from '../../../jest/stubs'

import { setUrl, itRendersCorrectlyShallow } from '../../../jest/test-helpers'

jest.mock('../../services/film-service')

describe('SearchContainer page component', () => {
  const setSearchParamsMock = jest.fn()
  const fetchFilmsMock = jest.fn()
  const historyMock = {
    push: jest.fn()
  }

  const props = {
    match: null,
    history: historyMock,
    searchBy: 'title',
    sortBy: 'release_date',
    films: films,
    filmsError: null,
    foundCount: films.length,
    displayCount: 15,
    isFetching: false,
    setSearchParams: setSearchParamsMock,
    fetchFilms: fetchFilmsMock
  }

  const render = () => {
    const wrapper = shallow(<SearchContainer {...props} />)

    return { wrapper, instance: wrapper.instance() }
  }

  beforeEach(() => {
    setSearchParamsMock.mockClear()
    fetchFilmsMock.mockClear()
    setUrl('/')

    props.match = {
      params: {
        search: ''
      }
    }
    props.films = films
    props.foundCount = films.length

    fetchFilmsMock.mockReturnValue(Promise.resolve())
  })

  afterEach(() => {
    global.IS_SERVER = false
  })

  describe('it renders correctly', () => {
    itRendersCorrectlyShallow(() => {
      const { store } = configureStore()
      return <SearchContainerConnected store={store} />
    }, 'when connected to the store')

    itRendersCorrectlyShallow(
      () => <SearchContainer {...props} />,
      'when films are provided'
    )

    itRendersCorrectlyShallow(() => {
      props.films = []
      props.foundCount = 0

      return <SearchContainer {...props} />
    }, 'when no films found')
  })

  it('generates error for Error Boundary test', () => {
    setUrl('?throwError=1')

    expect(() => render()).toThrowError('Error Boundary test')
  })

  it('loads films on server side', () => {
    global.IS_SERVER = true

    render()

    expect(fetchFilmsMock).toHaveBeenCalled()
  })

  it(`loads films on client side if they haven't been loaded`, () => {
    props.foundCount = 0
    props.match.params.search = 'Comedy'

    render()

    expect(setSearchParamsMock).toHaveBeenCalledWith({
      search: props.match.params.search
    })
    expect(fetchFilmsMock).toHaveBeenCalled()
  })

  /*   it(`saves 'search' from route to store`, () => {
    props.match.params.search = 'Comedy'

    render()

    expect(setSearchParamsMock).toHaveBeenCalledWith({
      search: props.match.params.search
    })
  }) */

  it(`'search' is empty by default`, () => {
    props.foundCount = 0
    props.match.params.search = undefined

    render()

    expect(setSearchParamsMock).toHaveBeenCalledWith({
      search: ''
    })
  })

  it(`updates 'sortBy' on sort change`, () => {
    const sortBy = 'vote_average'

    const { instance } = render()
    instance.onSortByChange(sortBy)

    expect(setSearchParamsMock).toHaveBeenCalledWith({ sortBy })
  })

  it(`updates 'search', 'searchBy' and URL on search change`, () => {
    const params = { search: 'Horror', searchBy: 'genre' }

    const { instance } = render()
    instance.onSearchChange(params)

    expect(setSearchParamsMock).toHaveBeenCalledWith(params)
    expect(historyMock.push).toHaveBeenCalledWith('/search/Horror')
  })

  it(`loads films on 'search' change`, () => {
    const { wrapper, instance } = render()
    // Clear initial call
    fetchFilmsMock.mockClear()

    wrapper.setProps({ match: { params: { search: 'Thriller' } } })
    // https://github.com/airbnb/enzyme/issues/34
    instance.componentDidUpdate(props)

    expect(fetchFilmsMock).toHaveBeenCalled()
  })

  it(`loads films on 'searchBy' change`, () => {
    const { wrapper, instance } = render()
    fetchFilmsMock.mockClear()

    wrapper.setProps({ searchBy: 'genres' })
    instance.componentDidUpdate(props)

    expect(fetchFilmsMock).toHaveBeenCalled()
  })

  it(`loads films on 'sortBy' change`, () => {
    const { wrapper, instance } = render()
    fetchFilmsMock.mockClear()

    wrapper.setProps({ sortBy: 'vote_average' })
    instance.componentDidUpdate(props)

    expect(fetchFilmsMock).toHaveBeenCalled()
  })

  it(`doesn't load films if none of search params has changed`, () => {
    const { wrapper, instance } = render()
    fetchFilmsMock.mockClear()

    wrapper.setProps({ foundCount: 2 })
    instance.componentDidUpdate(props)

    expect(fetchFilmsMock).not.toHaveBeenCalled()
  })

  it('displays an error when unable to load the films', async () => {
    const error = new Error('Films load error')

    const { wrapper, instance } = render()

    wrapper.setProps({ filmsError: error })
    instance.componentDidUpdate(props)

    expect(toast.error).toHaveBeenCalled()
  })
})
