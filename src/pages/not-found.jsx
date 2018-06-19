// @flow

import React from 'react'

import { Header, Footer, SiteName, ContentMessage } from '../components'
import { NavigateButton } from '../styles'

export function NotFound() {
  return (
    <React.Fragment>
      <Header>
        <div className="padding-controls">
          <SiteName />
        </div>
      </Header>
      <main className="content">
        <ContentMessage className="font-size-header font-bold color-alt flex-column text-center">
          <p>
            404<br />
            Page not found
          </p>
          <NavigateButton to="/">Go home</NavigateButton>
        </ContentMessage>
      </main>
      <Footer />
    </React.Fragment>
  )
}

export default NotFound
