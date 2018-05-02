import React from 'react'
import PropTypes from 'prop-types'

import './loading-indicator.css'

LoadingIndicator.propTypes = {
  hideText: PropTypes.bool.isRequired
}

export function LoadingIndicator(props) {
  return (
    <div className="centered loading-indicator font-bold">
      <div>
        <div className="loading-spinner">
          <div className="loading-spinner__bounce loading-spinner__bounce--1" />
          <div className="loading-spinner__bounce loading-spinner__bounce--2" />
          <div className="loading-spinner__bounce" />
        </div>
        {props.hideText ? null : (
          <React.Fragment>Loading&hellip;</React.Fragment>
        )}
      </div>
    </div>
  )
}
