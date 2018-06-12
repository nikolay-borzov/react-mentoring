import React from 'react'
import { Link } from 'react-router-dom'

import { Header, Footer, SiteName, ContentMessage } from '../components'

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
          <Link to="/" className="button button--primary">
            Go home
          </Link>
        </ContentMessage>
      </main>
      <Footer />
    </React.Fragment>
  )
}

export default NotFound
