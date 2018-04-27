import React from 'react'
import PropTypes from 'prop-types'

import './radio.css'

const styleClassMap = {
  button: 'radio-input--style-button',
  plain: 'radio-input--style-plain'
}

export class Radio extends React.PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        selected: PropTypes.bool
      })
    ).isRequired,
    onChange: PropTypes.func.isRequired,
    style: PropTypes.oneOf(['button', 'plain'])
  }

  static defaultProps = {
    style: 'plain'
  }

  constructor(props) {
    super(props)

    this.styleClassName = styleClassMap[props.style]
  }

  isOptionSelected(option) {
    return option.value === this.props.value
  }

  getOptionInputId(option) {
    return `${this.props.name}_${option.value}`
  }

  onChange = changeEvent => {
    this.props.onChange(changeEvent.target.value)
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
              defaultChecked={this.isOptionSelected(option)}
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
