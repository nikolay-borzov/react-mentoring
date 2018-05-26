import React from 'react'
import { shallow } from 'enzyme'

import {
  itContainsComponent,
  itRendersCorrectlyShallow
} from '../jest/test-helpers'

import { App } from './app'
import { ErrorBoundary } from './components'

describe('App component', () => {
  it(`wrapped in 'ErrorBoundary' component`, () => {
    const wrapper = shallow(<App />)

    expect(wrapper.type()).toBe(ErrorBoundary)
  })

  itRendersCorrectlyShallow(() => <App />)

  itContainsComponent(() => <App />, 'ToastContainer')
})
