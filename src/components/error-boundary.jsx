// @flow

import * as React from 'react'

import './error-boundary.css'

type ErrorBoundaryProps = {
  children: React.ChildrenArray<React.Element<any>>
}

type ErrorBoundaryState = {
  hasError: boolean,
  error?: Error,
  errorInfo?: {
    componentStack: any
  }
}

export class ErrorBoundary extends React.PureComponent<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = {
    hasError: false
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo
    })

    // TIP: Send error details to the server
  }

  render() {
    const { hasError, error, errorInfo } = this.state

    if (hasError) {
      return (
        <div className="error-boundary centered alt-background">
          <div className="padding-content">
            <h1>Something went wrong.</h1>

            <details>
              <summary>
                Details<br />
              </summary>
              {error && error.toString()}
              <br />
              {errorInfo.componentStack}
            </details>

            <p itemProp="telephone">
              Please try again later or contact support at&nbsp;
              <a href="tel:+46771793336" rel="nofollow">
                46 771 793 336
              </a>
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
