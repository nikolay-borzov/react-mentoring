import * as React from 'react'

export interface ContentMessageProps {
  children: React.ReactNode
  className?: string
}

export const ContentMessage: React.FunctionComponent<ContentMessageProps> = (
  props: ContentMessageProps
) => <div className={`centered ${props.className}`}>{props.children}</div>

ContentMessage.defaultProps = {
  className: ''
}

export default ContentMessage
