import React from 'react'

export interface ToastErrorProps {
  message: string
  error?: Error
}

export const ToastError: React.FunctionComponent<ToastErrorProps> = ({
  message,
  error
}) => (
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
