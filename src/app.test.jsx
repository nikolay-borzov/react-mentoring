import React from 'react'

import {
  itContainsComponent,
  itRendersCorrectlyShallow
} from '../jest/test-helpers'

import { App } from './app'

describe('App component', () => {
  const props = {
    Router: jest.fn(),
    location: '',
    context: {
      url: ''
    },
    store: {
      subscribe: jest.fn(),
      dispatch: jest.fn(),
      getState: jest.fn()
    }
  }

  itRendersCorrectlyShallow(() => <App {...props} />)

  itContainsComponent(() => <App {...props} />, 'ToastContainer')
})
