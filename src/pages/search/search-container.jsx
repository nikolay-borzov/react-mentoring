import React from 'react'
import { toast } from 'react-toastify'

import { filmService } from '../../services/film-service'
import { QueryParams } from '../../entities'
import { sortBy, searchBy, sortOrder } from '../../enums'

import { Header, Footer, SiteName, Loading } from '../../components'

import { SeachForm } from './components/search-form'
import { SearchResults } from './components/search-results'
import { SearchResultsEmpty } from './components/search-results-empty'

export class SearchContainer extends React.Component {
  constructor(props) {
    super(props)

    this.queryParams = new QueryParams()
      .limit(17)
      .search('')
      .searchBy(searchBy.title)
      .sortBy(sortBy.releaseDate)
      .sortOrder(sortOrder.desc)

    this.state = {
      error: null,
      isLoaded: false,
      films: [],
      foundCount: 0,
      queryParams: this.queryParams.getParams()
    }
  }

  componentDidMount() {
    const queryStringParams = new URLSearchParams(location.search)

    // Simulate error to test error boundary
    if (queryStringParams.get('throwError') === '1') {
      throw new Error('Error Boundary test')
    }

    const limit = queryStringParams.has('limit')
      ? parseInt(queryStringParams.get('limit'), 10)
      : 17

    this.queryParams.limit(limit)

    this.loadFilms()
  }

  loadFilms() {
    this.setState({
      isLoaded: false,
      queryParams: this.queryParams.getParams()
    })

    filmService
      .getFilms(this.queryParams)
      .then(result => {
        this.setState({
          films: result.data,
          foundCount: result.total,
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

  onSortByChange = sortBy => {
    this.queryParams.sortBy(sortBy)
    this.loadFilms()
  }

  onSearchChange = ({ search, searchBy }) => {
    this.queryParams.search(search)
    this.queryParams.searchBy(searchBy)
    this.loadFilms()
  }

  render() {
    let content

    if (this.state.isLoaded) {
      content =
        this.state.foundCount > 0 ? (
          <SearchResults
            films={this.state.films}
            foundCount={this.state.foundCount}
            displayCount={this.state.queryParams.limit}
            sortBy={this.state.queryParams.sortBy}
            onSortByChange={this.onSortByChange}
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
          <SeachForm
            search={this.state.queryParams.search}
            searchBy={this.state.queryParams.searchBy}
            onSearchChange={this.onSearchChange}
          />
        </Header>
        <main className="content">{content}</main>
        <Footer />
      </React.Fragment>
    )
  }
}
