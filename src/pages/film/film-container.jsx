import React from 'react'
import PropTypes from 'prop-types'
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
  FilmsGrid,
  SearchResultsPanel,
  ContentMessage
} from '../../components'

import { FilmDetails } from './components/film-details'

export class FilmContainer extends React.Component {
  static propTypes = {
    filmId: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props)

    this.queryParams = new QueryParams()
      .limit(30)
      .search('')
      .searchBy(searchBy.genres)
      .sortBy(sortBy.rating)
      .sortOrder(sortOrder.desc)

    this.state = {
      isFilmLoaded: false,
      film: null,
      genre: '',
      relatedFilms: [],
      isRelatedFilmsLoaded: false,
      relatedFilmsError: false
    }
  }

  componentDidMount() {
    this.loadFilm(this.props.filmId)
  }

  loadFilm(id) {
    return filmService
      .getFilm(id)
      .then(film => {
        const genre = film.genres[0]

        this.setState({
          film,
          genre
        })

        this.loadRelatedFilms(genre)
      })
      .catch(error => {
        this.setState({
          isRelatedFilmsLoaded: true
        })

        toast.error(
          <ToastError message="Unable to load the movie" error={error} />
        )
      })
      .finally(() => {
        this.setState({
          isFilmLoaded: true
        })
      })
  }

  loadRelatedFilms(genre) {
    this.queryParams.search(genre)

    return filmService
      .getFilms(this.queryParams)
      .then(result => {
        this.setState({
          relatedFilms: result.data
        })
      })
      .catch(error => {
        this.setState({
          relatedFilmsError: true
        })

        toast.error(
          <ToastError message="Unable to load related movies" error={error} />
        )
      })
      .finally(() => {
        this.setState({
          isRelatedFilmsLoaded: true
        })
      })
  }

  render() {
    let relatedFilms

    if (this.state.relatedFilms.length > 0) {
      relatedFilms = <FilmsGrid films={this.state.relatedFilms} />
    } else if (this.state.relatedFilmsError) {
      relatedFilms = (
        <ContentMessage className="error-message">
          Unable to load related movies
        </ContentMessage>
      )
    } else {
      relatedFilms = (
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
          <LoadingBlock isLoaded={this.state.isFilmLoaded} hideText={true}>
            <FilmDetails film={this.state.film} />
          </LoadingBlock>
        </Header>

        <main className="content">
          <LoadingBlock isLoaded={this.state.isRelatedFilmsLoaded}>
            <SearchResultsPanel>
              Films by {this.state.genre} genre
            </SearchResultsPanel>
            {relatedFilms}
          </LoadingBlock>
        </main>
        <Footer />
      </React.Fragment>
    )
  }
}
