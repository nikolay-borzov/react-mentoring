import * as React from 'react'
import styled from 'styled-components'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorInfo {
  componentStack: string
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

const ErrorBoundaryDetails = styled.details`
  whitespace: 'pre-wrap';
`

export class ErrorBoundary extends React.PureComponent<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      hasError: true,
      error,
      errorInfo
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

            <ErrorBoundaryDetails>
              <summary>
                Details
                <br />
              </summary>
              {error && error.toString()}
              <br />
              {errorInfo && errorInfo.componentStack}
            </ErrorBoundaryDetails>

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
