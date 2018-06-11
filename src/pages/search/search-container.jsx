import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify'

import { setParams, fetchFilms, selectors } from '../../redux/modules/search'

import { GetLoadable } from '../../components/helpers'

import {
  Header,
  Footer,
  SiteName,
  LoadingBlock,
  ToastError
} from '../../components'

import { SearchForm } from './components/search-form'

/* istanbul ignore next */
const ContentMessage = GetLoadable(() =>
  import('../../components/content-message')
)
/* istanbul ignore next */
const SearchResults = GetLoadable(() => import('./components/search-results'))

const mapStateToProps = state => ({
  search: selectors.searchParams.search(state),
  searchBy: selectors.searchParams.searchBy(state),
  sortBy: selectors.searchParams.sortBy(state),
  films: selectors.films.films(state),
  filmsError: selectors.films.error(state),
  foundCount: selectors.films.total(state),
  displayCount: selectors.films.limit(state),
  isFetching: selectors.films.isFetching(state)
})

const mapDispatchToProps = { setSearchParams: setParams, fetchFilms }

export class SearchContainer extends React.PureComponent {
  static propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
    searchBy: PropTypes.string.isRequired,
    sortBy: PropTypes.string.isRequired,
    films: PropTypes.arrayOf(PropTypes.object),
    filmsError: PropTypes.object,
    foundCount: PropTypes.number.isRequired,
    displayCount: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
    setSearchParams: PropTypes.func.isRequired,
    fetchFilms: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    if (IS_SERVER) {
      this.initialLoad(props)
    }
  }

  initialLoad(props) {
    const { search = '' } = props.match.params
    // Always take last query value from the route
    this.props.setSearchParams({ search })
    this.loadFilms()
  }

  componentDidMount() {
    const searchParams = new URLSearchParams(location.search)

    // Simulate error to test error boundary
    if (searchParams.get('throwError') === '1') {
      throw new Error('Error Boundary test')
    }

    // Check if films already loaded (on server side)
    if (this.props.foundCount === 0) {
      this.initialLoad(this.props)
    }
  }

  componentDidUpdate(prevProps) {
    const {
      sortBy: prevSortBy,
      searchBy: prevSearchBy,
      match: {
        params: { search: prevSearch }
      }
    } = prevProps

    const {
      sortBy,
      searchBy,
      match: {
        params: { search }
      },
      filmsError
    } = this.props

    // Load films if any of search parameters has changed
    if (
      search !== prevSearch ||
      sortBy !== prevSortBy ||
      searchBy !== prevSearchBy
    ) {
      this.loadFilms()
    }

    if (filmsError) {
      toast.error(
        <ToastError message="Unable to load movies" error={filmsError} />
      )
    }
  }

  loadFilms() {
    this.props.fetchFilms()
  }

  onSearchChange = ({ search, searchBy }) => {
    this.props.setSearchParams({ search, searchBy })
    this.props.history.push(`/search/${search}`)
  }

  onSortByChange = sortBy => {
    this.props.setSearchParams({ sortBy })
  }

  render() {
    const {
      searchBy,
      films,
      foundCount,
      displayCount,
      isFetching,
      sortBy
    } = this.props

    const { search = '' } = this.props.match.params

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
        <Helmet>
          <title>
            {search ? `"${search}" search results 🎥 ` : ''}
            Movie Search
          </title>
        </Helmet>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer)
