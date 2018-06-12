// @flow

import React from 'react'

import './image-loading.css'

type ImageLoadingProps = {
  className: string
}

ImageLoading.defaultProps = {
  className: ''
}

export function ImageLoading({ className }: ImageLoadingProps) {
  return (
    <div className={`image-loading-indicator ${className}`}>
      <div className="image-spinner">
        <div className="image-spinner__bounce1" />
        <div className="image-spinner__bounce2" />
      </div>
    </div>
  )
}
