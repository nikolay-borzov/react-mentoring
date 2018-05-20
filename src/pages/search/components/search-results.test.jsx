import React from 'react'

import { SearchResults } from './search-results'

describe('SearchResults component', () => {
  let props = {
    onSortByChange: jest.fn()
  }

  beforeEach(() => {
    props.foundCount = 3000
    props.displayCount = 15
    props.films = []
    props.sortBy = 'release_date'

    props.onSortByChange.mockClear()
  })

  it('renders correctly', () => {
    const wrapper = shallow(<SearchResults {...props} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders correctly when only one movie is found', () => {
    props.foundCount = 1
    props.displayCount = 1

    const wrapper = shallow(<SearchResults {...props} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders correctly when found count is bigger than limit value', () => {
    props.foundCount = 10
    props.displayCount = 11

    const wrapper = shallow(<SearchResults {...props} />)

    expect(wrapper).toMatchSnapshot()
  })
})
