import React from 'react'
import { shallow } from 'enzyme'

import { SearchResults, SearchResultsProps } from './search-results'

describe('SearchResults component', () => {
  const onSortByChangeMock = jest.fn()

  let props: SearchResultsProps = {
    foundCount: 0,
    displayCount: 0,
    films: [],
    onSortByChange: onSortByChangeMock
  }

  beforeEach(() => {
    props.foundCount = 3000
    props.displayCount = 15
    props.films = []
    props.sortBy = 'release_date'

    onSortByChangeMock.mockClear()
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
