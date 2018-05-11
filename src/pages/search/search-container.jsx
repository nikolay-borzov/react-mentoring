import React from 'react'
import { toast } from 'react-toastify'

import filmService from '../../services/film-service'
import { QueryParams } from '../../entities'
import { sortBy, searchBy, sortOrder } from '../../enums'

import {
  Header,
  Footer,
  SiteName,
  LoadingBlock,
  ToastError,
  ContentMessage
} from '../../components'

import SearchForm from './components/search-form'
import { SearchResults } from './components/search-results'

export class SearchContainer extends React.PureComponent {
  constructor(props) {
    super(props)

    this.queryParams = new QueryParams()
      .limit(15)
      .search('')
      .searchBy(searchBy.title)
      .sortBy(sortBy.releaseDate)
      .sortOrder(sortOrder.desc)

    this.state = {
      isLoaded: false,
      films: [],
      foundCount: 0,
      queryParams: this.queryParams.getParams()
    }
  }

  componentDidMount() {
    const searchParams = new URLSearchParams(location.search)

    // Simulate error to test error boundary
    if (searchParams.get('throwError') === '1') {
      throw new Error('Error Boundary test')
    }

    const limit = searchParams.has('limit')
      ? parseInt(searchParams.get('limit'), 10)
      : 15

    this.queryParams.limit(limit)

    this.loadFilms()
  }

  loadFilms() {
    this.setState({
      isLoaded: false,
      queryParams: this.queryParams.getParams()
    })

    return filmService
      .getFilms(this.queryParams)
      .then(result => {
        this.setState({
          films: result.data,
          foundCount: result.total
        })
      })
      .catch(error => {
        toast.error(
          <ToastError message="Unable to load movies" error={error} />
        )
      })
      .finally(() => {
        this.setState({
          isLoaded: true
        })
      })
  }

  onSortByChange = sortBy => {
    this.queryParams.sortBy(sortBy)
    return this.loadFilms()
  }

  onSearchChange = ({ search, searchBy }) => {
    this.queryParams.search(search)
    this.queryParams.searchBy(searchBy)
    return this.loadFilms()
  }

  render() {
    /*
     search={this.state.queryParams.search}
              searchBy={this.state.queryParams.searchBy}
              onSearchChange={this.onSearchChange}
    */

    return (
      <React.Fragment>
        <Header>
          <div className="padding-controls">
            <SiteName />
            <SearchForm />
          </div>
        </Header>
        <main className="content">
          <LoadingBlock isLoaded={this.state.isLoaded}>
            {this.state.foundCount > 0 ? (
              <SearchResults
                films={this.state.films}
                foundCount={this.state.foundCount}
                displayCount={this.state.queryParams.limit}
                sortBy={this.state.queryParams.sortBy}
                onSortByChange={this.onSortByChange}
              />
            ) : (
              <ContentMessage className="font-size-header font-bold color-alt">
                No movies found
              </ContentMessage>
            )}
          </LoadingBlock>
        </main>
        <Footer />
      </React.Fragment>
    )
  }
}
