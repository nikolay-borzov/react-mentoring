import React from 'react'
import renderer from 'react-test-renderer'

import { SiteName } from './site-name'

describe('SiteName component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SiteName> Site Name </SiteName>).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
