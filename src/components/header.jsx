// @flow

import * as React from 'react'

type HeaderProps = {
  children: React.ChildrenArray<React.Node>
}

export function Header(props: HeaderProps) {
  return <header className="alt-background">{props.children}</header>
}
