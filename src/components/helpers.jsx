import React from 'react'
import Loadable from 'react-loadable'

import { LoadingIndicator } from './loading-block/loading-indicator'

function Loading(props) {
  if (props.error) {
    return <div>Error!</div>
  } else if (props.pastDelay) {
    return <LoadingIndicator hideText={false} />
  } else {
    return null
  }
}

export function GetLoadable(loader) {
  return Loadable({
    loader,
    loading: Loading
  })
}
