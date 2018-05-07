import React from 'react'

import { itRendersCorrectly } from '../../jest/test-helpers'

import { ContentMessage } from './content-message'

describe('ContentMessage component', () => {
  itRendersCorrectly(() => (
    <ContentMessage>Some content message</ContentMessage>
  ))

  itRendersCorrectly(
    () => (
      <ContentMessage className="some-custom-class">
        Some content message
      </ContentMessage>
    ),
    'renders correctly with custom CSS class set'
  )
})
