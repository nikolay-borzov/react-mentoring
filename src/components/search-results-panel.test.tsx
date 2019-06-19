import React from 'react'

import { itRendersCorrectlyShallow } from '../../jest/test-helpers'

import { SearchResultsPanel } from './search-results-panel'

describe('SearchResultsPanel component', () => {
  itRendersCorrectlyShallow(() => (
    <SearchResultsPanel>
      <p>Some content</p>
      <p>Another content</p>
    </SearchResultsPanel>
  ))
})
