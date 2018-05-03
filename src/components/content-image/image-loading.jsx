import React from 'react'

import './image-loading.css'

export function ImageLoading() {
  return (
    <div className="image-loading-indicator">
      <div className="image-spinner">
        <div className="image-spinner__bounce1" />
        <div className="image-spinner__bounce2" />
      </div>
    </div>
  )
}