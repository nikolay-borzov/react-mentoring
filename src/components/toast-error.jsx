import React from 'react'
import PropTypes from 'prop-types'

ToastError.propTypes = {
  message: PropTypes.string.isRequired,
  error: PropTypes.any
}

export function ToastError(props) {
  return (
    <div>
      {props.message}
      <br />
      {props.error.toString()}
    </div>
  )
}
