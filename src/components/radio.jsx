// @flow

import React from 'react'

import './radio.css'

const styleClassMap = {
  button: 'radio-input--style-button',
  plain: 'radio-input--style-plain'
}

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

export class Radio extends React.PureComponent<RadioProps> {
  static defaultProps = {
    style: 'plain'
  }

  isControlled: boolean
  value: string
  styleClassName: string

  constructor(props: Radio) {
    const value =
      typeof props.onChange === 'undefined' ? props.defaultValue : props.value

    super(props)

    // Set 'value' so that selected value is available in form's onSubmit handler
    this.value = value
    this.styleClassName = styleClassMap[props.style]
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
    return (
      <div className="radio-input-wrapper">
        <label className="form-label nowrap">{this.props.label}</label>
        {this.props.options.map(option => (
          <div
            key={option.value}
            className={`radio-input ${this.styleClassName}`}>
            <input
              type="radio"
              id={this.getOptionInputId(option)}
              name={this.props.name}
              value={option.value}
              defaultChecked={this.isDefaultChecked(option)}
              onChange={this.onChange}
            />
            <label
              htmlFor={this.getOptionInputId(option)}
              className="radio-input__label">
              {option.name}
            </label>
          </div>
        ))}
      </div>
    )
  }
}
