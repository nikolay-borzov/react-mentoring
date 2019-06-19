import * as React from 'react'

interface HeaderProps {
  children: React.ReactNode
}

export const Header: React.FunctionComponent<HeaderProps> = props => {
  return <header className="alt-background">{props.children}</header>
}
