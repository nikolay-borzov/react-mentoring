import React from 'react'
import PropTypes from 'prop-types'

export class Header extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  render() {
    return <header className="alt-background">{this.props.children}</header>
  }
}
