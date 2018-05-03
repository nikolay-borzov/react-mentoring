import React from 'react'
import renderer from 'react-test-renderer'

import { ToastError } from './toast-error'

describe('ToastError component', () => {
  it('renders correctly with message and error details', () => {
    const error = new Error('Some generic error')

    const tree = renderer
      .create(<ToastError message="Error happened" error={error} />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with message', () => {
    const tree = renderer
      .create(<ToastError message="Error happened" />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
