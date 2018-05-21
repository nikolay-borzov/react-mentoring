import React from 'react'

import { itRendersCorrectlyShallow } from '../../../jest/test-helpers'

import { LoadingIndicator } from './loading-indicator'

describe('LoadingIndicator component', () => {
  itRendersCorrectlyShallow(() => <LoadingIndicator hideText={false} />)

  itRendersCorrectlyShallow(
    () => <LoadingIndicator hideText={true} />,
    `renders correctly without 'loading' text`
  )
})
