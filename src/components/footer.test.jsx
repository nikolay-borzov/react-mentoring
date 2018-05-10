import React from 'react'

import {
  itRendersCorrectly,
  itContainsComponent
} from '../../jest/test-helpers'

import { Footer } from './footer'

describe('Footer component', () => {
  itRendersCorrectly(() => <Footer />)

  itContainsComponent(() => <Footer />, 'SiteName')
})
