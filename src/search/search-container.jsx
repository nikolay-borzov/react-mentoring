import React from 'react'

import { Header, Footer, SiteName } from '../core/components'

import { SeachForm } from './search-form'
// import { SearchResults } from './search-results'
import { SearchResultsEmpty } from './search-results-empty'

export class SearchContainer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header>
          <SiteName />
        </Header>
        <SeachForm />
        <main className="content">
          <SearchResultsEmpty />
        </main>
        <Footer />
      </React.Fragment>
    )
  }
}
