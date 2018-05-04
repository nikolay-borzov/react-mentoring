import React from 'react'

import { itRendersCorrectly } from '../../jest/test-helpers'

import { SearchResultsPanel } from './search-results-panel'

describe('SearchResultsPanel component', () => {
  itRendersCorrectly(() => (
    <SearchResultsPanel>
      <p>Some content</p>
      <p>Another content</p>
    </SearchResultsPanel>
  ))
})
