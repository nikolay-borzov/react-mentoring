import React from 'react'

import { SearchForm } from './search-form'

import { itRendersCorrectlyShallow } from '../../../../jest/test-helpers'

describe('SearchForm component', () => {
  let props = {
    onSearchChange: jest.fn()
  }

  beforeEach(() => {
    props.search = ''
    props.searchBy = 'title'

    props.onSearchChange.mockClear()
  })

  itRendersCorrectlyShallow(() => <SearchForm {...props} />)

  it(`calls 'onSearchChange' on form submit`, () => {
    props.search = 'A movie'
    const wrapper = mount(<SearchForm {...props} />)
    const eventMock = {
      preventDefault: jest.fn()
    }

    wrapper.find('form').simulate('submit', eventMock)

    expect(eventMock.preventDefault).toHaveBeenCalled()
    expect(props.onSearchChange).toHaveBeenCalledWith({
      search: props.search,
      searchBy: props.searchBy
    })
  })
})
