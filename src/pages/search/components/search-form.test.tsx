import React from 'react'
import { mount } from 'enzyme'

import { SearchForm, SearchFormProps } from './search-form'
import { itRendersCorrectlyShallow } from '../../../../jest/test-helpers'

describe('SearchForm component', () => {
  const onSearchChangeMock = jest.fn()

  let props: SearchFormProps = {
    search: '',
    onSearchChange: onSearchChangeMock
  }

  beforeEach(() => {
    props.search = ''
    props.searchBy = 'title'

    onSearchChangeMock.mockClear()
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

  // TODO: Remove this test?
  it(`doesn't call 'onSearchChange' if 'searchInput' doesn't exist`, () => {
    const wrapper = mount<SearchForm>(<SearchForm {...props} />)
    const eventMock = {
      preventDefault: jest.fn()
    }

    // @ts-ignore
    wrapper.instance().searchInput!.current = undefined

    wrapper.find('form').simulate('submit', eventMock)

    expect(eventMock.preventDefault).toHaveBeenCalled()
    expect(props.onSearchChange).not.toHaveBeenCalled()
  })
})
