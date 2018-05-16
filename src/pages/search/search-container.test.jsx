import React from 'react'
import { shallow } from 'enzyme'

import { films } from '../../../jest/stubs'

import { toast } from 'react-toastify'
import { SearchContainer } from './search-container'

import { setUrl, itRendersCorrectlyShallow } from '../../../jest/test-helpers'

jest.mock('../../services/film-service')

describe('SearchContainer page component', () => {
  const setSearchParamsMock = jest.fn()
  const fetchFilmsMock = jest.fn()

  const props = {
    search: '',
    searchBy: 'title',
    sortBy: 'release_date',
    films: films,
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

    props.films = films
    props.foundCount = films.length

    fetchFilmsMock.mockReturnValue(Promise.resolve())
  })

  describe('it renders correctly', () => {
    beforeEach(() => {
      fetchFilmsMock.mockReturnValue(Promise.resolve())
    })

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

  /* TODO: Implement when router is integrated
  it('takes params from URL', () => {
    setUrl('?limit=25')

    const { instance } = render()

    expect(instance.queryParams.getParams()).toMatchObject({
      limit: 25
    })
  })
  */

  it('generates error for Error Boundary test', () => {
    setUrl('?throwError=1')

    expect(() => render()).toThrowError('Error Boundary test')
  })

  it('loads films', () => {
    render()

    expect(fetchFilmsMock).toHaveBeenCalled()
  })

  it('loads films on sort change', () => {
    const sortBy = 'vote_average'

    const { instance } = render()

    // Clear initial call
    fetchFilmsMock.mockClear()
    return instance.onSortByChange(sortBy).then(() => {
      expect(setSearchParamsMock).toHaveBeenCalledWith({ sortBy })
      expect(fetchFilmsMock).toHaveBeenCalled()
    })
  })

  it('loads films on search change', () => {
    const params = { search: 'Horror', searchBy: 'genre' }

    const { instance } = render()

    // Clear initial call
    fetchFilmsMock.mockClear()
    return instance.onSearchChange(params).then(() => {
      expect(setSearchParamsMock).toHaveBeenCalledWith(params)
      expect(fetchFilmsMock).toHaveBeenCalled()
    })
  })

  it('displays error when unable to load the films', async () => {
    const error = new Error('Films load error')
    fetchFilmsMock.mockReturnValue(Promise.reject(error))

    const { instance } = render()

    expect.assertions(1)

    return instance.loadFilms().then(() => {
      expect(toast.error).toHaveBeenCalled()
    })
  })
})
