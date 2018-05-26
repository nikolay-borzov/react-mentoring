import React from 'react'

import { itRendersCorrectlyShallow } from '../../jest/test-helpers'
import NotFound from './not-found'

describe('NotFound page component', () => {
  itRendersCorrectlyShallow(() => <NotFound />)
})
