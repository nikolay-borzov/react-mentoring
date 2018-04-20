import React from 'react'

import { Header, Footer, SiteName } from '../core/components'

import { SeachForm } from './search-form'
import { SearchResults } from './search-results'
import { SearchResultsEmpty } from './search-results-empty'

export class SearchContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = { foundCount: 7 }
  }

  render() {
    return (
      <React.Fragment>
        <Header>
          <SiteName />
        </Header>
        <SeachForm />
        <main className="content">
          {this.state.foundCount > 0 ? (
            <SearchResults foundCount={this.state.foundCount} />
          ) : (
            <SearchResultsEmpty />
          )}
        </main>
        <Footer />
      </React.Fragment>
    )
  }
}
