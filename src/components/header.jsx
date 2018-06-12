// @flow

import React from 'react'

type HeaderProps = {
  children: any
}

export function Header(props: HeaderProps) {
  return <header className="alt-background">{props.children}</header>
}
