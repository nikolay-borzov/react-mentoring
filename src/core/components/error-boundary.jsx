import React from 'react'
import PropTypes from 'prop-types'

export class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  }

  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo
    })

    // TODO: Send error details to the server
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="centered alt-background">
          <div>
            <h1>Something went wrong.</h1>

            <details style={{ whiteSpace: 'pre-wrap' }}>
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
