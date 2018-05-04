import React from 'react'
import { shallow } from 'enzyme'

import { itRendersCorrectly } from '../../jest/test-helpers'

import { ErrorBoundary } from './error-boundary'

describe('ErrorBoundary component', () => {
  // Mute error logs https://github.com/airbnb/enzyme/issues/1255
  jest.spyOn(window._virtualConsole, 'emit').mockImplementation(() => false)
  jest.spyOn(window.console, 'error').mockImplementation(() => false)

  itRendersCorrectly(
    () => <ErrorBoundary>Content</ErrorBoundary>,
    'renders children if no errors have happened'
  )

  itRendersCorrectly(() => {
    function ErroneousComponent() {
      throw new Error('Some genic error')
    }

    return (
      <ErrorBoundary>
        <ErroneousComponent />
      </ErrorBoundary>
    )
  }, 'renders correctly when an error has happened')

  it('should render children when passed in', () => {
    const wrapper = shallow(
      <ErrorBoundary>
        <div className="unique" />
      </ErrorBoundary>
    )

    expect(wrapper.contains(<div className="unique" />)).toBeTruthy()
  })
})
