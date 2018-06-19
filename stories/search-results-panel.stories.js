import React from 'react'
import { storiesOf } from '@storybook/react'

import { SearchResultsPanel } from '../src/components'

storiesOf('SearchResultsPanel', module).addWithJSX('Default', () => (
  <SearchResultsPanel>
    <div>Content</div>
    <div>Content</div>
  </SearchResultsPanel>
))
