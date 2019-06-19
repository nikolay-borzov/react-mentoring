import * as React from 'react'

import { LoadingIndicator } from './loading-indicator'

interface LoadingBlockProps {
  isLoaded: boolean
  children: React.ReactNode
  hideText?: boolean
}

// TODO: Investigate why this is called four times (film-container.js) while props.isLoaded is changed only once
export const LoadingBlock: React.FunctionComponent<
  LoadingBlockProps
> = props => {
  if (props.isLoaded) {
    return <>{props.children}</>
  }

  return <LoadingIndicator hideText={props.hideText} />
}

LoadingBlock.defaultProps = {
  hideText: false
}
