import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify'

import {
  fetchFilms,
  selectors as filmsSelectors
} from '../../redux/modules/films'
import {
  setParams,
  selectors as searchSelectors
} from '../../redux/modules/search'

import {
  Header,
  Footer,
  SiteName,
  LoadingBlock,
  ToastError,
  ContentMessage
} from '../../components'

import { SearchForm } from './components/search-form'
import { SearchResults } from './components/search-results'

const mapStateToProps = state => ({
  search: searchSelectors.search(state),
  searchBy: searchSelectors.searchBy(state),
  sortBy: searchSelectors.sortBy(state),
  films: filmsSelectors.films(state),
  foundCount: filmsSelectors.total(state),
  displayCount: filmsSelectors.limit(state),
  isFetching: filmsSelectors.isFetching(state)
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setSearchParams: setParams, fetchFilms }, dispatch)

export class SearchContainer extends React.PureComponent {
  static propTypes = {
    search: PropTypes.string,
    searchBy: PropTypes.string,
    sortBy: PropTypes.string,
    films: PropTypes.arrayOf(PropTypes.object),
    foundCount: PropTypes.number.isRequired,
    displayCount: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
    setSearchParams: PropTypes.func.isRequired,
    fetchFilms: PropTypes.func.isRequired
  }

  componentDidMount() {
    const searchParams = new URLSearchParams(location.search)

    // Simulate error to test error boundary
    if (searchParams.get('throwError') === '1') {
      throw new Error('Error Boundary test')
    }

    this.loadFilms()
  }

  loadFilms() {
    return this.props.fetchFilms().catch(error => {
      toast.error(<ToastError message="Unable to load movies" error={error} />)
    })
  }

  onSearchChange = ({ search, searchBy }) => {
    this.props.setSearchParams({ search, searchBy })
    return this.loadFilms()
  }

  onSortByChange = sortBy => {
    this.props.setSearchParams({ sortBy })
    return this.loadFilms()
  }

  render() {
    const {
      search,
      searchBy,
      films,
      foundCount,
      displayCount,
      isFetching,
      sortBy
    } = this.props

    const searchFormProps = {
      search,
      searchBy,
      onSearchChange: this.onSearchChange
    }

    const searchResultsProps = {
      films,
      foundCount,
      displayCount,
      sortBy,
      onSortByChange: this.onSortByChange
    }

    return (
      <React.Fragment>
        <Header>
          <div className="padding-controls">
            <SiteName />
            <SearchForm {...searchFormProps} />
          </div>
        </Header>
        <main className="content">
          <LoadingBlock isLoaded={!isFetching}>
            {foundCount > 0 ? (
              <SearchResults {...searchResultsProps} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer)
