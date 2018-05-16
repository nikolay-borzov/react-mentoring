import React from 'react'
import { shallow } from 'enzyme'

import { itContainsComponent, setUrl } from '../jest/test-helpers'

import { App } from './app'
import { ErrorBoundary } from './components'

describe('App component', () => {
  it(`wrapped in 'ErrorBoundary' component`, () => {
    const wrapper = shallow(<App />)

    expect(wrapper.type()).toBe(ErrorBoundary)
  })

  itContainsComponent(() => <App />, 'ToastContainer')

  itContainsComponent(
    () => {
      setUrl('/')
      return <App />
    },
    'Connect(SearchContainer)',
    {
      testName: `renders 'SearchContainer' by default`
    }
  )

  itContainsComponent(
    () => {
      setUrl('/?id=1')
      return <App />
    },
    'FilmContainer',
    {
      testName: `renders 'FilmContainer' if URL contains 'id' parameter`
    }
  )
})
