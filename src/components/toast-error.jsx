// @flow

import React from 'react'

type ToastErrorProps = {
  message: string,
  error: Error
}

export function ToastError({ message, error }: ToastErrorProps) {
  return (
    <div>
      {message}
      {error ? (
        <React.Fragment>
          <br />
          {error.toString()}
        </React.Fragment>
      ) : null}
    </div>
  )
}
