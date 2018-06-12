// @flow

import React from 'react'

import './loading-indicator.css'

type LoadingIndicatorProps = {
  hideText: boolean
}

export function LoadingIndicator(props: LoadingIndicatorProps) {
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
