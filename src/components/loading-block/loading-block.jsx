import React from 'react'
import PropTypes from 'prop-types'

import { LoadingIndicator } from './loading-indicator'

LoadingBlock.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired
}

export function LoadingBlock(props) {
  const content = props.isLoaded ? props.children : <LoadingIndicator />

  return content
}
