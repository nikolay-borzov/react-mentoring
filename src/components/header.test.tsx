import React from 'react'

import { itRendersCorrectlyShallow } from '../../jest/test-helpers'

import { Header } from './header'

describe('Header component', () => {
  itRendersCorrectlyShallow(() => (
    <Header>
      Header content <p>More content</p>
    </Header>
  ))
})
