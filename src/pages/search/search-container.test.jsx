import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import { films } from '../../../jest/stubs'

import filmService from '../../services/film-service'
import { toast } from 'react-toastify'
import { SearchContainer } from './search-container'

import { setUrl } from '../../../jest/test-helpers'

jest.mock('../../services/film-service')

describe('SearchContainer page component', () => {
  const getFilmsResponse = {
    data: films,
    total: 3000
  }

  const render = () => {
    const wrapper = shallow(<SearchContainer />)

    return { wrapper, instance: wrapper.instance() }
  }

  beforeEach(() => {
    filmService.getFilms.mockClear()
    setUrl('/')
  })

  describe('it renders correctly', () => {
    let tree

    beforeEach(() => {
      filmService.getFilms.mockReturnValue(Promise.resolve(getFilmsResponse))
      tree = renderer.create(<SearchContainer />)
    })

    it('when films are provided', () => {
      tree.root.instance.setState({
        films,
        isLoaded: true
      })

      expect(tree.toJSON()).toMatchSnapshot()
    })

    it('when no films found', () => {
      tree.root.instance.setState({
        films: [],
        isLoaded: true,
        foundCount: 0
      })

      expect(tree.toJSON()).toMatchSnapshot()
    })
  })

  it('sets initial query params', () => {
    filmService.getFilms.mockReturnValue(Promise.resolve(getFilmsResponse))

    const { instance } = render()

    expect(instance.queryParams.getParams()).toMatchObject({
      limit: 15,
      search: '',
      searchBy: 'title',
      sortBy: 'release_date',
      sortOrder: 'desc'
    })
  })

  it('takes params from URL', () => {
    setUrl('?limit=25')

    const { instance } = render()

    expect(instance.queryParams.getParams()).toMatchObject({
      limit: 25
    })
  })

  it('generates error for Error Boundary test', () => {
    setUrl('?throwError=1')

    expect(() => render()).toThrowError('Error Boundary test')
  })

  it('loads films', () => {
    filmService.getFilms.mockReturnValue(Promise.resolve(getFilmsResponse))

    const { wrapper, instance } = render()

    expect(filmService.getFilms).toHaveBeenCalledWith(instance.queryParams)

    return instance.loadFilms().then(() => {
      const state = wrapper.state()

      expect(state.films).toBe(films)
      expect(state.foundCount).toBe(getFilmsResponse.total)
      expect(state.isLoaded).toBe(true)
    })
  })

  it('loads films on sort change', () => {
    filmService.getFilms.mockReturnValue(Promise.resolve(getFilmsResponse))
    const sortBy = 'vote_average'

    const { instance } = render()

    filmService.getFilms.mockClear()
    return instance.onSortByChange(sortBy).then(() => {
      expect(instance.queryParams.getParams()).toMatchObject({
        sortBy
      })

      // Two calls - one initial and one on sort change
      expect(filmService.getFilms).toHaveBeenCalled()
    })
  })

  it('loads films on search change', () => {
    filmService.getFilms.mockReturnValue(Promise.resolve(getFilmsResponse))
    const params = { search: 'Horror', searchBy: 'genre' }

    const { instance } = render()

    filmService.getFilms.mockClear()
    return instance.onSearchChange(params).then(() => {
      expect(instance.queryParams.getParams()).toMatchObject(params)

      // Two calls - one initial and one on sort change
      expect(filmService.getFilms).toHaveBeenCalled()
    })
  })

  it('displays error when unable to load the films', async () => {
    const error = new Error('Films load error')
    filmService.getFilms.mockReturnValue(Promise.reject(error))

    const { wrapper, instance } = render()

    expect.assertions(2)

    return instance.loadFilms().then(() => {
      expect(toast.error).toHaveBeenCalled()
      expect(wrapper.state().isLoaded).toBe(true)
    })
  })
})
