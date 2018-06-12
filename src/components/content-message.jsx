// @flow

import React from 'react'

type ContentMessageProps = {
  children: any,
  className: string
}

ContentMessage.defaultProps = {
  className: ''
}

export function ContentMessage(props: ContentMessageProps) {
  return <div className={`centered ${props.className}`}>{props.children}</div>
}

export default ContentMessage
