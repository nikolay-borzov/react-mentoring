import React from 'react'
import PropTypes from 'prop-types'

import { LoadingIndicator } from './loading-indicator'

LoadingBlock.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  children: PropTypes.any.isRequired,
  hideText: PropTypes.bool
}

LoadingBlock.defaultProps = {
  hideText: false
}

// TODO: Investigate why this is called four times (film-container.js) while props.isLoaded is changed only once
export function LoadingBlock(props) {
  if (props.isLoaded) {
    return props.children
  }

  return <LoadingIndicator hideText={props.hideText} />
}
