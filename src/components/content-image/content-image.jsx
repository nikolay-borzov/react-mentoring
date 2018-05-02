import React from 'react'
import PropTypes from 'prop-types'

import './content-image.css'

import ImageLoader from 'react-load-image'
import { ImageLoading } from './image-loading'

ContentImage.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string
}

ContentImage.defaultProps = {
  title: ''
}

export function ContentImage(props) {
  return (
    <ImageLoader src={props.src}>
      <img className="content-image" title={props.title} />
      <div>Cannot load image</div>
      <ImageLoading />
    </ImageLoader>
  )
}
