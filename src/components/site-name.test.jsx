import React from 'react'

import { itRendersCorrectly } from '../../jest/test-helpers'

import { SiteName } from './site-name'

describe('SiteName component', () => {
  itRendersCorrectly(() => <SiteName> Site Name </SiteName>)
})
