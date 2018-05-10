import React from 'react'
import PropTypes from 'prop-types'

import './error-boundary.css'

export class ErrorBoundary extends React.PureComponent {
  static propTypes = {
    children: PropTypes.any.isRequired
  }

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
    if (this.state.hasError) {
      return (
        <div className="error-boundary centered alt-background">
          <div className="padding-content">
            <h1>Something went wrong.</h1>

            <details>
              <summary>
                Details<br />
              </summary>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
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
