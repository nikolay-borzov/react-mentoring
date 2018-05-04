import React from 'react'
import renderer from 'react-test-renderer'

import { SearchResultsPanel } from './search-results-panel'

describe('SearchResultsPanel component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <SearchResultsPanel>
          <p>Some content</p>
          <p>Another content</p>
        </SearchResultsPanel>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
