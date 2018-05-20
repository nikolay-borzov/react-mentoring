import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify'

import {
  fetchFilm,
  setRelatedFilmsSearchParams,
  fetchRelatedFilms,
  selectors
} from '../../redux/modules/view'

import {
  Header,
  Footer,
  SiteName,
  LoadingBlock,
  ToastError,
  FilmsGrid,
  SearchResultsPanel,
  ContentMessage
} from '../../components'

import { FilmDetails } from './components/film-details'

const mapStateToProps = state => ({
  film: selectors.film.film(state),
  filmIsFetching: selectors.film.isFetching(state),
  genre: selectors.relatedFilms.searchParams.search(state),
  relatedFilms: selectors.relatedFilms.films.films(state),
  relatedFilmsIsFetching: selectors.relatedFilms.films.isFetching(state),
  relatedFilmsError: selectors.relatedFilms.films.error(state)
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchFilm,
      setRelatedFilmsSearchParams,
      fetchRelatedFilms
    },
    dispatch
  )

export class FilmContainer extends React.Component {
  static propTypes = {
    filmId: PropTypes.number.isRequired,
    film: PropTypes.object,
    filmIsFetching: PropTypes.bool.isRequired,
    genre: PropTypes.string.isRequired,
    relatedFilms: PropTypes.arrayOf(PropTypes.object),
    relatedFilmsIsFetching: PropTypes.bool.isRequired,
    relatedFilmsError: PropTypes.object,
    fetchFilm: PropTypes.func.isRequired,
    setRelatedFilmsSearchParams: PropTypes.func.isRequired,
    fetchRelatedFilms: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.loadFilm(this.props.filmId)
  }

  loadFilm(id) {
    return this.props
      .fetchFilm(id)
      .then(() => {
        const genres = this.props.film.genres
        this.loadRelatedFilms(genres[0])
      })
      .catch(error => {
        toast.error(
          <ToastError message="Unable to load the movie" error={error} />
        )
      })
  }

  loadRelatedFilms(genre) {
    const { setRelatedFilmsSearchParams, fetchRelatedFilms } = this.props

    setRelatedFilmsSearchParams({
      search: genre
    })

    return fetchRelatedFilms().catch(error => {
      this.setState({
        relatedFilmsError: true
      })

      toast.error(
        <ToastError message="Unable to load related movies" error={error} />
      )
    })
  }

  render() {
    const {
      film,
      filmIsFetching,
      genre,
      relatedFilms,
      relatedFilmsIsFetching,
      relatedFilmsError
    } = this.props

    let relatedFilmsBlock

    if (relatedFilms.length > 0) {
      relatedFilmsBlock = <FilmsGrid films={relatedFilms} />
    } else if (relatedFilmsError) {
      relatedFilmsBlock = (
        <ContentMessage className="error-message">
          Unable to load related movies
        </ContentMessage>
      )
    } else {
      relatedFilmsBlock = (
        <ContentMessage className="font-size-header font-bold color-alt">
          No related movies found
        </ContentMessage>
      )
    }

    return (
      <React.Fragment>
        <Header>
          <div className="padding-controls flex flex-align-center">
            <div className="flex-grow">
              <SiteName />
            </div>
            <a href="/" className="button button--small button--primary">
              Search
            </a>
          </div>
          <LoadingBlock isLoaded={!filmIsFetching} hideText={true}>
            <FilmDetails film={film} />
          </LoadingBlock>
        </Header>

        <main className="content">
          <LoadingBlock isLoaded={!relatedFilmsIsFetching}>
            <SearchResultsPanel>Films by {genre} genre</SearchResultsPanel>
            {relatedFilmsBlock}
          </LoadingBlock>
        </main>
        <Footer />
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmContainer)
