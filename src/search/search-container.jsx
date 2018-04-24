import React from 'react'
import axios from 'axios'

import { Header, Footer, SiteName } from '../core/components'

import { SeachForm } from './search-form'
import { SearchResults } from './search-results'
import { SearchResultsEmpty } from './search-results-empty'

export class SearchContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = { foundCount: 7 }

    this.state = {
      error: null,
      isLoaded: false,
      films: [],
      foundCount: 0
    }
  }

  componentDidMount() {
    axios
      .get('/movies', {
        params: {
          limit: 17
        }
      })
      .then(({ data }) => {
        this.setState({
          films: data.data,
          foundCount: data.total,
          isLoaded: true
        })
      })
      .catch(error => {
        // TODO: Show user-friendly message
        console.log(error)
        this.setState({
          error,
          isLoaded: true
        })
      })
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
            <SearchResults
              films={this.state.films}
              foundCount={this.state.foundCount}
            />
          ) : (
            <SearchResultsEmpty />
          )}
        </main>
        <Footer />
      </React.Fragment>
    )
  }
}
