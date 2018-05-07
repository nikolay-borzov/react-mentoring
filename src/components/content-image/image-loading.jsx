import React from 'react'
import PropTypes from 'prop-types'

import './image-loading.css'

ImageLoading.propTypes = {
  className: PropTypes.string
}

ImageLoading.defaultProps = {
  className: ''
}

export function ImageLoading(props) {
  return (
    <div className={`image-loading-indicator ${props.className}`}>
      <div className="image-spinner">
        <div className="image-spinner__bounce1" />
        <div className="image-spinner__bounce2" />
      </div>
    </div>
  )
}
