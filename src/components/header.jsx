import React from 'react'
import PropTypes from 'prop-types'

Header.propTypes = {
  children: PropTypes.any.isRequired
}

export function Header(props) {
  return <header className="alt-background">{props.children}</header>
}
