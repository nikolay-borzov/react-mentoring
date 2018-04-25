import React from 'react'

export function Loading() {
  return (
    <div className="centered loading-indicator font-bold">
      <div>
        <div className="spinner">
          <div className="spinner__bounce spinner__bounce--1" />
          <div className="spinner__bounce spinner__bounce--2" />
          <div className="spinner__bounce spinner__bounce--3" />
        </div>
        Loading&hellip;
      </div>
    </div>
  )
}
