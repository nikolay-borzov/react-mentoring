import React from 'react'

import { itRendersCorrectly } from '../../jest/test-helpers'

import { Header } from './header'

describe('Header component', () => {
  itRendersCorrectly(() => (
    <Header>
      Header content <p>More content</p>
    </Header>
  ))
})
