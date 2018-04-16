import React from 'react'
import PropTypes from 'prop-types'

export class Header extends React.PureComponent {
  render() {
    return <header className="layout-block">{this.props.children}</header>
  }
}

Header.propTypes = {
  children: PropTypes.element.isRequired
}
