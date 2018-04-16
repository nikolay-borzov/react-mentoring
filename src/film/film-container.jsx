import React from 'react'

import { Header } from '../core/header'
import { Footer } from '../core/footer'
import { SiteName } from '../core/site-name'

export class FilmContainer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header>
          <SiteName />
        </Header>
        <Footer />
      </React.Fragment>
    )
  }
}
