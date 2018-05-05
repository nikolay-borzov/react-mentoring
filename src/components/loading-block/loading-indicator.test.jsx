import React from 'react'

import { itRendersCorrectly } from '../../../jest/test-helpers'

import { LoadingIndicator } from './loading-indicator'

describe('LoadingIndicator component', () => {
  itRendersCorrectly(() => <LoadingIndicator hideText={false} />)

  itRendersCorrectly(
    () => <LoadingIndicator hideText={true} />,
    `renders correctly without 'loading' text`
  )
})
