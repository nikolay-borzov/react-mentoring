import React from 'react'
import renderer from 'react-test-renderer'
// import { mount } from 'enzyme'

import { Radio } from './radio'

describe('Radio component', () => {
  const options = [
    {
      name: 'Cat',
      value: 'cat'
    },
    {
      name: 'Dog',
      value: 'dog'
    }
  ]

  let props

  beforeEach(() => {
    props = {
      label: 'Radio label',
      name: 'radioName',
      options: options,
      value: undefined,
      onChange: undefined,
      defaultValue: undefined
    }
  })

  it('renders correctly as controlled component', () => {
    props.value = 'cat'
    props.onChange = jest.fn()

    const tree = renderer.create(<Radio {...props} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders correctly as uncontrolled component', () => {
    props.defaultValue = 'cat'

    const tree = renderer.create(<Radio {...props} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it(`calls 'onChange' callback if controlled`, () => {})

  it(`update 'value' callback if uncontrolled`, () => {})
})
