// @flow

import * as React from 'react'

import { LoadingIndicator } from './loading-indicator'

type LoadingBlockProps = {
  isLoaded: boolean,
  children: React.ChildrenArray<React.Node>,
  hideText: boolean
}

LoadingBlock.defaultProps = {
  hideText: false
}

// TODO: Investigate why this is called four times (film-container.js) while props.isLoaded is changed only once
export function LoadingBlock(props: LoadingBlockProps) {
  if (props.isLoaded) {
    return props.children
  }

  return <LoadingIndicator hideText={props.hideText} />
}
