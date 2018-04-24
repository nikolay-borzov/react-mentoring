import React from 'react'
import PropTypes from 'prop-types'

export class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error: error,
      info: info
    })

    // console.log(error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="centered">
          <div>
            <h1>Something went wrong.</h1>
            <div>
              <label htmlFor="error">Error</label>
              <textarea>{this.state.error}</textarea>
            </div>
            <div>
              <label htmlFor="info">Info</label>
              <textarea>{JSON.stringify(this.state.info)}</textarea>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
