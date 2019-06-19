import React from 'react'

import { itRendersCorrectlyShallow } from '../../jest/test-helpers'

import { SiteName } from './site-name'

describe('SiteName component', () => {
  itRendersCorrectlyShallow(() => <SiteName> Site Name </SiteName>)
})
