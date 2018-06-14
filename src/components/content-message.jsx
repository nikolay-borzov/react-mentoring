// @flow

import * as React from 'react'

type ContentMessageProps = {
  children: React.ChildrenArray<React.Element<any>>,
  className: string
}

ContentMessage.defaultProps = {
  className: ''
}

export function ContentMessage(props: ContentMessageProps) {
  return <div className={`centered ${props.className}`}>{props.children}</div>
}

export default ContentMessage
