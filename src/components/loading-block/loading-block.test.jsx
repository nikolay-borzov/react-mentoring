import React from 'react'
import { shallow } from 'enzyme'

import { itRendersCorrectlyShallow } from '../../../jest/test-helpers'

import { LoadingBlock } from './loading-block'

describe('LoadingBlock component', () => {
  let props = {
    isLoaded: false
  }

  itRendersCorrectlyShallow(() => (
    <LoadingBlock {...props}>Content</LoadingBlock>
  ))

  it(`contains 'props.children' if 'isLoaded=true'`, () => {
    props.isLoaded = true

    const wrapper = shallow(
      <LoadingBlock {...props}>
        <div>Content</div>
      </LoadingBlock>
    )

    expect(wrapper.contains(<div>Content</div>)).toBe(true)
  })

  it(`renders 'LoadingIndicator' if 'isLoaded=false'`, () => {
    props.isLoaded = false

    const wrapper = shallow(
      <LoadingBlock {...props}>
        <div>Content</div>
      </LoadingBlock>
    )

    expect(wrapper.find('LoadingIndicator').length).toBe(1)
  })
})
