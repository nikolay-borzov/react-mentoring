// @flow

import React from 'react'

import './content-image.css'

import ImageLoader from 'react-load-image'
import { ImageLoading } from './image-loading'

type ContentImageProps = {
  src: string,
  alt: string,
  title: string
}

ContentImage.defaultProps = {
  title: ''
}

export function ContentImage({ src, title, alt }: ContentImageProps) {
  return (
    <ImageLoader src={src}>
      <img className="content-image" title={title} alt={alt} />
      <div className="content-image-placeholder color-alt">
        <span>Image unavailable</span>
      </div>
      <ImageLoading className="content-image-placeholder" />
    </ImageLoader>
  )
}
