import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import { Footer } from './footer'

describe('Footer component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Footer />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it(`contains 'SiteName' component`, () => {
    const wrapper = shallow(<Footer />)

    expect(wrapper.find('SiteName').length).toBe(1)
  })
})
