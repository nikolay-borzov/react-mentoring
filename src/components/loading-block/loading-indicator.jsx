import React from 'react'

import './loading-indicator.css'

export function LoadingIndicator() {
  return (
    <div className="centered loading-indicator font-bold">
      <div>
        <div className="loading-spinner">
          <div className="loading-spinner__bounce loading-spinner__bounce--1" />
          <div className="loading-spinner__bounce loading-spinner__bounce--2" />
          <div className="loading-spinner__bounce" />
        </div>
        Loading&hellip;
      </div>
    </div>
  )
}
