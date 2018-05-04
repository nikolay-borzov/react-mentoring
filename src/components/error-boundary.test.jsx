import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import { ErrorBoundary } from './error-boundary'

describe('ErrorBoundary component', () => {
  // Mute error logs https://github.com/airbnb/enzyme/issues/1255
  jest.spyOn(window._virtualConsole, 'emit').mockImplementation(() => false)
  jest.spyOn(window.console, 'error').mockImplementation(() => false)

  it('renders children if no errors have happened', () => {
    const tree = renderer
      .create(<ErrorBoundary>Content</ErrorBoundary>)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders correctly when an error has happened', () => {
    function ErroneousComponent() {
      throw new Error('Some genic error')
    }

    const tree = renderer
      .create(
        <ErrorBoundary>
          <ErroneousComponent />
        </ErrorBoundary>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render children when passed in', () => {
    const wrapper = shallow(
      <ErrorBoundary>
        <div className="unique" />
      </ErrorBoundary>
    )

    expect(wrapper.contains(<div className="unique" />)).toBeTruthy()
  })
})
