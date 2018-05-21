import React from 'react'

import { itRendersCorrectlyShallow } from '../../jest/test-helpers'

import { ToastError } from './toast-error'

describe('ToastError component', () => {
  itRendersCorrectlyShallow(() => {
    const error = new Error('Some generic error')

    return <ToastError message="Error happened" error={error} />
  }, 'renders correctly with message and error details')

  itRendersCorrectlyShallow(
    () => <ToastError message="Error happened" />,
    'renders correctly with message'
  )
})
