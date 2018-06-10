import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify'

import { fetchFilm, reFetchFilms, selectors } from '../../redux/modules/view'

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

import NotFound from '../not-found'

import { FilmDetails } from './components/film-details'

const mapStateToProps = state => ({
  film: selectors.film.film(state),
  filmIsFetching: selectors.film.isFetching(state),
  filmError: selectors.film.error(state),
  genre: selectors.relatedFilms.searchParams.search(state),
  relatedFilms: selectors.relatedFilms.films.films(state),
  relatedFilmsIsFetching: selectors.relatedFilms.films.isFetching(state),
  relatedFilmsError: selectors.relatedFilms.films.error(state)
})

const mapDispatchToProps = {
  fetchFilm,
  reFetchFilms
}

export class FilmContainer extends React.Component {
  static propTypes = {
    match: PropTypes.object,
    film: PropTypes.object,
    filmIsFetching: PropTypes.bool.isRequired,
    filmError: PropTypes.object,
    genre: PropTypes.string.isRequired,
    relatedFilms: PropTypes.arrayOf(PropTypes.object),
    relatedFilmsIsFetching: PropTypes.bool.isRequired,
    relatedFilmsError: PropTypes.object,
    fetchFilm: PropTypes.func.isRequired,
    reFetchFilms: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    if (IS_SERVER) {
      this.initialLoad(props)
    }
  }

  initialLoad(props) {
    this.loadFilm(props.match.params.id)
  }

  componentDidMount() {
    const film = this.props.film
    const filmId = parseInt(this.props.match.params.id, 10)
    // If films was loaded on server - load related films
    if (film && film.id === filmId) {
      this.props.reFetchFilms()
    } else {
      this.initialLoad(this.props)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const filmId = this.props.match.params.id
    const { filmError, relatedFilmsError } = this.props
    // Load film if film id has changed
    if (prevProps.match.params.id !== filmId) {
      this.loadFilm(filmId)
    }

    if (filmError) {
      toast.error(
        <ToastError message="Unable to load the movie" error={filmError} />
      )
    } else if (relatedFilmsError) {
      toast.error(
        <ToastError
          message="Unable to load related movies"
          error={relatedFilmsError}
        />
      )
    }
  }

  loadFilm(id) {
    this.props.fetchFilm(id)
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

    if (film && !film.id) {
      return <NotFound />
    }

    let relatedFilmsBlock = null

    if (relatedFilms.length > 0) {
      relatedFilmsBlock = <FilmsGrid films={relatedFilms} />
    } else if (relatedFilmsError) {
      relatedFilmsBlock = (
        <ContentMessage className="error-message">
          Unable to load related movies
        </ContentMessage>
      )
    } else if (film) {
      relatedFilmsBlock = (
        <ContentMessage className="font-size-header font-bold color-alt">
          No related movies found
        </ContentMessage>
      )
    }

    return (
      <React.Fragment>
        {film ? (
          <Helmet>
            <title>{film.title} 🎥 Movie Search</title>
          </Helmet>
        ) : null}
        <Header>
          <div className="padding-controls flex flex-align-center">
            <div className="flex-grow">
              <SiteName />
            </div>
            <Link to="/search" className="button button--small button--primary">
              Search
            </Link>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilmContainer)
