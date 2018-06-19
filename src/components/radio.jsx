// @flow

import * as React from 'react'
import styled, { css } from 'styled-components'

import { HoverEffectMixin, FormLabel } from '../styles'

const STYLE_BUTTON = 'button'
const STYLE_PLAIN = 'plain'

type RadioOption = {|
  name: string,
  value: string
|}

type RadioControlledProps = {|
  label: string,
  name: string,
  value: string,
  options: RadioOption[],
  onChange: (value: string) => void,
  style: 'button' | 'plain'
|}

type RadioUncontrolledProps = {|
  label: string,
  name: string,
  defaultValue: string,
  options: RadioOption[],
  style: 'button' | 'plain'
|}

type RadioProps = RadioControlledProps | RadioUncontrolledProps

const RadioInputWrapper = styled.div`
  display: flex;
  align-items: center;
`

const labelMixinMap = {
  [STYLE_BUTTON]: css`
    display: flex;
    padding: var(--padding-button-small);
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: 700;
    box-sizing: border-box;
    border: none;
    color: var(--color-text-light);
    background-color: var(--color-default);

    ${HoverEffectMixin};

    input:checked + & {
      background-color: var(--color-primary);
    }
  `,
  [STYLE_PLAIN]: css`
    padding: 0.25rem 0.5rem;

    input:checked + & {
      color: var(--color-primary);
    }
  `
}

const RadioInputLabel = styled.label`
  user-select: none;
  white-space: nowrap;

  ${props => labelMixinMap[props.inputStyle]};
`

const RadioInput = styled.div`
  margin-right: var(--margin-input);

  input {
    opacity: 0;
    position: absolute;
  }

  input:focus + ${RadioInputLabel} {
    outline: var(--focus);
  }
`

export class Radio extends React.PureComponent<RadioProps> {
  static defaultProps = {
    style: 'plain'
  }

  value: string

  constructor(props: RadioProps) {
    let value
    if (props.onChange) {
      value = props.value
    } else {
      value = props.defaultValue
    }

    super(props)

    // Set 'value' so that selected value is available in form's onSubmit handler
    this.value = value
  }

  isDefaultChecked(option: RadioOption) {
    return option.value === this.value
  }

  getOptionInputId(option: RadioOption) {
    return `${this.props.name}_${option.value}`
  }

  onChange = (changeEvent: SyntheticInputEvent<HTMLInputElement>) => {
    const value = changeEvent.target.value

    if (typeof this.props.onChange !== 'undefined') {
      this.props.onChange(value)
    } else {
      this.value = value
    }
  }

  render() {
    const { label, options, style } = this.props

    return (
      <RadioInputWrapper>
        <FormLabel className="nowrap">{label}</FormLabel>
        {options.map(option => (
          <RadioInput key={option.value}>
            <input
              type="radio"
              id={this.getOptionInputId(option)}
              name={this.props.name}
              value={option.value}
              defaultChecked={this.isDefaultChecked(option)}
              onChange={this.onChange}
            />
            <RadioInputLabel
              htmlFor={this.getOptionInputId(option)}
              inputStyle={style}>
              {option.name}
            </RadioInputLabel>
          </RadioInput>
        ))}
      </RadioInputWrapper>
    )
  }
}
