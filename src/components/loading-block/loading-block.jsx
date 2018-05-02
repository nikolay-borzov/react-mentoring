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

export function LoadingBlock(props) {
  const content = props.isLoaded ? (
    props.children
  ) : (
    <LoadingIndicator hideText={props.hideText} />
  )

  return content
}
