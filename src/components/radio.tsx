import * as React from 'react'
import styled, { css, FlattenSimpleInterpolation } from 'styled-components'

import { HoverEffectMixin, FormLabel } from '../styles'

const STYLE_BUTTON = 'button'
const STYLE_PLAIN = 'plain'

interface RadioOption {
  name: string
  value: string
}

type RadioStyle = 'button' | 'plain'

interface RadioPropsCommon {
  label: string
  name: string
  options: RadioOption[]
  style?: RadioStyle
}

export interface RadioControlledProps extends RadioPropsCommon {
  label: string
  name: string
  value?: string
  options: RadioOption[]
  style?: RadioStyle
  onChange(value: string): void
}

export interface RadioUncontrolledProps extends RadioPropsCommon {
  label: string
  name: string
  defaultValue?: string
  options: RadioOption[]
  style?: RadioStyle
}

export type RadioProps = RadioControlledProps | RadioUncontrolledProps

const RadioInputWrapper = styled.div`
  display: flex;
  align-items: center;
`

const labelMixinMap: Record<string, FlattenSimpleInterpolation> = {
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

interface RadioInputLabelProps {
  inputStyle: RadioStyle
}

const RadioInputLabel = styled.label<RadioInputLabelProps>`
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

function isControlledRadio(props: RadioProps): props is RadioControlledProps {
  return 'onChange' in props
}

class RadioBase<TProps extends RadioPropsCommon> extends React.PureComponent<TProps> {
  value?: string

  isDefaultChecked(option: RadioOption) {
    return option.value === this.value
  }

  getOptionInputId(option: RadioOption) {
    return `${this.props.name}_${option.value}`
  }

  onChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => { }

  render() {
    const { label, options, style = 'plain' } = this.props

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

export class RadioControlled extends RadioBase<RadioControlledProps> {
  constructor(props: RadioControlledProps) {
    super(props)

    this.value = props.value
  }

  onChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    const value = changeEvent.target.value

    this.props.onChange(value)
  }
}

export class RadioUncontrolled extends RadioBase<RadioUncontrolledProps> {
  constructor(props: RadioUncontrolledProps) {
    super(props)

    this.value = props.defaultValue
  }

  onChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    const value = changeEvent.target.value

    this.value = value
  }
}

// TODO: Replace by two components
export class Radio extends React.PureComponent<RadioProps> {
  value?: string

  constructor(props: RadioProps) {
    super(props)

    let value
    if (isControlledRadio(props)) {
      value = props.value
    } else {
      value = props.defaultValue
    }

    // Set 'value' so that selected value is available in form's onSubmit handler
    this.value = value
  }

  isDefaultChecked(option: RadioOption) {
    return option.value === this.value
  }

  getOptionInputId(option: RadioOption) {
    return `${this.props.name}_${option.value}`
  }

  onChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    const value = changeEvent.target.value

    if (isControlledRadio(this.props)) {
      this.props.onChange(value)
    } else {
      this.value = value
    }
  }

  render() {
    const { label, options, style = 'plain' } = this.props

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
