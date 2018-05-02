import React from 'react'
import PropTypes from 'prop-types'
import { isUndefined } from 'lodash-es'

import './radio.css'

const styleClassMap = {
  button: 'radio-input--style-button',
  plain: 'radio-input--style-plain'
}

export class Radio extends React.PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: function(props, propName) {
      if (!isUndefined(props.value)) {
        if (isUndefined(props.onChange)) {
          return new Error(`'onChange' must be specified if 'value' is set`)
        } else if (!isUndefined(props.defaultValue)) {
          return new Error(
            `'defaultValue' must not be specified if 'value' is set`
          )
        }
      }
    },
    defaultValue: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    ).isRequired,
    onChange: PropTypes.func,
    style: PropTypes.oneOf(['button', 'plain'])
  }

  static defaultProps = {
    style: 'plain'
  }

  constructor(props) {
    super(props)

    this.isControlled =
      !isUndefined(props.value) && !isUndefined(props.onChange)

    this.value = this.isControlled ? this.props.value : this.props.defaultValue

    this.styleClassName = styleClassMap[props.style]
  }

  isDefaultChecked(option) {
    return option.value === this.value
  }

  getOptionInputId(option) {
    return `${this.props.name}_${option.value}`
  }

  onChange = changeEvent => {
    const value = changeEvent.target.value

    if (this.isControlled) {
      this.props.onChange(value)
    } else {
      this.value = value
    }
  }

  render() {
    return (
      <React.Fragment>
        <label className="form-label">{this.props.label}</label>
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
      </React.Fragment>
    )
  }
}
