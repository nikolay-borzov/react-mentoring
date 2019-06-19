import React from 'react'
import Loadable from 'react-loadable'

import { LoadingIndicator } from './loading-block/loading-indicator'

interface LoadableLoadingProps {
  error: any
  pastDelay: boolean
}

/* istanbul ignore next */
function Loading(props: LoadableLoadingProps) {
  if (props.error) {
    return <div>{props.error}</div>
  } else if (props.pastDelay) {
    return <LoadingIndicator hideText={false} />
  } else {
    return null
  }
}

export function GetLoadable<TProps>(loader: () => Promise<any>) {
  return Loadable<TProps, any>({
    loader,
    loading: Loading
  })
}
