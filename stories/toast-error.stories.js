import React from 'react'
import { storiesOf } from '@storybook/react'

import { ToastError } from '../src/components'

const error = new Error('Generic error')

storiesOf('ToastError', module)
  .addWithJSX('With error', () => (
    <ToastError message="Error occurred" error={error} />
  ))
  .addWithJSX('Without error', () => <ToastError message="Error occurred" />)
