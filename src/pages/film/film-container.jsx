import React from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

import { filmService } from '../../services/film-service'
import { QueryParams } from '../../entities'
import { sortBy, searchBy, sortOrder } from '../../enums'

import {
  Header,
  Footer,
  SiteName,
  LoadingBlock,
  ToastError,
  FilmsGrid,
  SearchResultsPanel
} from '../../components'

import { FilmDetails } from './components/film-details'

export class FilmContainer extends React.Component {
  static propTypes = {
    filmId: PropTypes.string.isRequired
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
      error: null,
      isFilmLoaded: false,
      film: null,
      genre: '',
      relatedFilms: [],
      isRelatedFilmsLoaded: false
    }
  }

  componentDidMount() {
    const queryStringParams = new URLSearchParams(location.search)

    filmService
      .getFilm(queryStringParams.get('id'))
      .then(film => {
        const genre = film.genres[0]

        this.setState({
          film,
          genre
        })

        this.loadRelatedFilms(genre)
      })
      .catch(error => {
        toast.error(<ToastError message="Unable to load movie" error={error} />)
      })
      .finally(() => {
        this.setState({
          isFilmLoaded: true
        })
      })
  }

  loadRelatedFilms(genre) {
    this.queryParams.search(genre)

    filmService
      .getFilms(this.queryParams)
      .then(result => {
        this.setState({
          relatedFilms: result.data
        })
      })
      .catch(error => {
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
            {/* Figure out how to defer rendering children until isLoaded=true */}
            {this.state.film ? (
              <FilmDetails film={this.state.film} />
            ) : (
              <React.Fragment />
            )}
          </LoadingBlock>
        </Header>
        <main className="content">
          <LoadingBlock isLoaded={this.state.isRelatedFilmsLoaded}>
            <SearchResultsPanel>
              Films by {this.state.genre} genre
            </SearchResultsPanel>
            <FilmsGrid films={this.state.relatedFilms} />
          </LoadingBlock>
        </main>
        <Footer />
      </React.Fragment>
    )
  }
}
