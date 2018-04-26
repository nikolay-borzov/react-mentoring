import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

import { Header, Footer, SiteName, Loading } from '../core/components'

import { SeachForm } from './search-form'
import { SearchResults } from './search-results'
import { SearchResultsEmpty } from './search-results-empty'

import { QueryParams } from '../core/entities'

import { sortBy } from '../core/enums'

export class SearchContainer extends React.Component {
  constructor(props) {
    super(props)

    this.queryParams = new QueryParams()
      .limit(15)
      .searchBy('title')
      .sortBy(sortBy.releaseDate)

    this.state = {
      error: null,
      isLoaded: false,
      films: [],
      foundCount: 0,
      queryParams: this.queryParams.getParams()
    }
  }

  componentDidMount() {
    // Simulate error to test error boundary
    const params = new URLSearchParams(location.search)
    if (params.get('throwError') === '1') {
      throw new Error('Error Boundary test')
    }

    this.loadFilms(this.state.queryParams)
  }

  loadFilms(queryParams) {
    axios
      .get('/movies', {
        params: queryParams
      })
      .then(({ data }) => {
        this.setState({
          films: data.data,
          foundCount: data.total,
          isLoaded: true
        })
      })
      .catch(error => {
        this.setState({
          error,
          isLoaded: true
        })

        toast.error(
          <div>
            Unable to load movies:<br />
            {error.toString()}
          </div>,
          {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: false
          }
        )
      })
  }

  reloadFilms() {
    this.updateQueryParams()
    this.loadFilms(this.queryParams.getParams())
  }

  updateQueryParams() {
    this.setState({
      queryParams: this.queryParams.getParams()
    })
  }

  onSortByChange(sortBy) {
    this.queryParams.sortBy(sortBy)
    this.reloadFilms()
  }

  onSearchChange(search) {
    this.queryParams.search(search)
    this.reloadFilms()
  }

  render() {
    let content

    if (this.state.isLoaded) {
      content =
        this.state.foundCount > 0 ? (
          <SearchResults
            films={this.state.films}
            foundCount={this.state.foundCount}
            sortBy={this.state.queryParams.sortBy}
            onSortByChange={this.onSortByChange.bind(this)}
          />
        ) : (
          <SearchResultsEmpty />
        )
    } else {
      content = <Loading />
    }

    return (
      <React.Fragment>
        <Header>
          <SiteName />
          <SeachForm />
        </Header>
        <main className="content">{content}</main>
        <Footer />
      </React.Fragment>
    )
  }
}
