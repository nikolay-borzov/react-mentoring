import React from 'react'

import { itRendersCorrectly } from '../../jest/test-helpers'

import { ToastError } from './toast-error'

describe('ToastError component', () => {
  itRendersCorrectly(() => {
    const error = new Error('Some generic error')

    return <ToastError message="Error happened" error={error} />
  }, 'renders correctly with message and error details')

  itRendersCorrectly(
    () => <ToastError message="Error happened" />,
    'renders correctly with message'
  )
})
