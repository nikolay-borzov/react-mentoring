import React from 'react'

import {
  itRendersCorrectlyShallow,
  itContainsComponent
} from '../../jest/test-helpers'

import { Footer } from './footer'

describe('Footer component', () => {
  itRendersCorrectlyShallow(() => <Footer />)

  itContainsComponent(() => <Footer />, 'SiteName')
})
