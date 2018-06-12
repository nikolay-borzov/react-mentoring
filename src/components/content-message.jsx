import React from 'react'
import PropTypes from 'prop-types'

ContentMessage.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string
}

ContentMessage.defaultProps = {
  className: ''
}

export function ContentMessage(props) {
  return <div className={`centered ${props.className}`}>{props.children}</div>
}

export default ContentMessage
