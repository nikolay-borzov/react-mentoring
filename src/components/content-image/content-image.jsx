import React from 'react'
import PropTypes from 'prop-types'

import './content-image.css'

import ImageLoader from 'react-load-image'
import { ImageLoading } from './image-loading'

ContentImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string
}

ContentImage.defaultProps = {
  title: ''
}

export function ContentImage(props) {
  return (
    <ImageLoader src={props.src}>
      <img className="content-image" title={props.title} alt={props.alt} />
      <div className="content-image-placeholder color-alt">
        <span>Image unavailable</span>
      </div>
      <ImageLoading className="content-image-placeholder" />
    </ImageLoader>
  )
}
