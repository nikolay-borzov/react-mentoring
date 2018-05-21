import React from 'react'

import { itRendersCorrectlyShallow } from '../../jest/test-helpers'

import { ContentMessage } from './content-message'

describe('ContentMessage component', () => {
  itRendersCorrectlyShallow(() => (
    <ContentMessage>Some content message</ContentMessage>
  ))

  itRendersCorrectlyShallow(
    () => (
      <ContentMessage className="some-custom-class">
        Some content message
      </ContentMessage>
    ),
    'renders correctly with custom CSS class set'
  )
})
