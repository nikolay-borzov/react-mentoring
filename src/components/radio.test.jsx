import React from 'react'
import { shallow } from 'enzyme'

import { itRendersCorrectlyShallow } from '../../jest/test-helpers'

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

  const selectLastRadio = (wrapper, value) => {
    wrapper
      .find('input[type="radio"]')
      .last()
      .simulate('change', { target: { value: 'dog' } })
  }

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

  describe('if controlled', () => {
    itRendersCorrectlyShallow(() => {
      props.value = 'cat'
      props.onChange = jest.fn()
      props.style = 'button'

      return <Radio {...props} />
    })

    it(`calls 'onChange' callback`, () => {
      const onChangeMock = jest.fn()
      props.value = 'cat'
      props.onChange = onChangeMock
      const wrapper = shallow(<Radio {...props} />)

      selectLastRadio(wrapper)

      expect(onChangeMock.mock.calls.length).toBe(1)
      expect(onChangeMock.mock.calls[0][0]).toBe('dog')
    })
  })

  describe('if uncontrolled', () => {
    itRendersCorrectlyShallow(() => {
      props.defaultValue = 'cat'
      props.style = 'plain'

      return <Radio {...props} />
    })

    it(`sets 'value' to be equal to 'defaultValue'`, () => {
      props.defaultValue = 'cat'
      const wrapper = shallow(<Radio {...props} />)

      expect(wrapper.instance().value).toBe('cat')
    })

    it(`updates 'value'`, () => {
      props.defaultValue = 'cat'
      const wrapper = shallow(<Radio {...props} />)

      selectLastRadio(wrapper)

      expect(wrapper.instance().value).toBe('dog')
    })
  })
})
