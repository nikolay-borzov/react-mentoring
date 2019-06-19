import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'

import { itRendersCorrectlyShallow } from '../../jest/test-helpers'

import { Radio, RadioControlled, RadioUncontrolled, RadioControlledProps, RadioUncontrolledProps } from './radio'

describe('Radio components', () => {
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

  const selectLastRadio = (wrapper: ShallowWrapper<any>) => {
    wrapper
      .find('input[type="radio"]')
      .last()
      .simulate('change', { target: { value: 'dog' } })
  }

  describe('if controlled', () => {
    let props: RadioControlledProps

    beforeEach(() => {
      props = {
        label: 'Radio label',
        name: 'radioName',
        options: options,
        value: undefined,
        onChange: () => {}
      }
    })

    itRendersCorrectlyShallow(() => {
      props.value = 'cat'
      props.onChange = jest.fn()
      props.style = 'button'

      return <RadioControlled {...props} />
    })

    it(`calls 'onChange' callback`, () => {
      const onChangeMock = jest.fn()
      props.value = 'cat'
      props.onChange = onChangeMock
      const wrapper = shallow(<RadioControlled {...props} />)

      selectLastRadio(wrapper)

      expect(onChangeMock.mock.calls.length).toBe(1)
      expect(onChangeMock.mock.calls[0][0]).toBe('dog')
    })
  })

  describe('if uncontrolled', () => {
    let props: RadioUncontrolledProps

    beforeEach(() => {
      props = {
        label: 'Radio label',
        name: 'radioName',
        options: options,
        defaultValue: undefined
      }
    })

    itRendersCorrectlyShallow(() => {
      props.defaultValue = 'cat'
      props.style = 'plain'

      return <RadioUncontrolled {...props} />
    })

    it(`sets 'value' to be equal to 'defaultValue'`, () => {
      props.defaultValue = 'cat'
      const wrapper = shallow<RadioUncontrolled>(<RadioUncontrolled {...props} />)

      expect(wrapper.instance().value).toBe('cat')
    })

    it(`updates 'value'`, () => {
      props.defaultValue = 'cat'
      const wrapper = shallow<RadioUncontrolled>(<RadioUncontrolled {...props} />)

      selectLastRadio(wrapper)

      expect(wrapper.instance().value).toBe('dog')
    })
  })
})
