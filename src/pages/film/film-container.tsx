import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify'

import { fetchFilm, reFetchFilms, selectors } from '../../redux/modules/view'
import { GetLoadable } from '../../components/helpers'
import {
  Header,
  Footer,
  SiteName,
  LoadingBlock,
  ToastError,
  SearchResultsPanel,
  FilmsGridProps,
  ContentMessageProps
} from '../../components'
import { NavigateButton } from '../../styles'
import { FilmDetails } from './components/film-details'
import { Film } from '../../entities/film'
import { AppState } from '../../redux/reducer'

/* istanbul ignore next */
const FilmsGrid = GetLoadable<FilmsGridProps>(() =>
  import('../../components/films-grid/films-grid')
)
/* istanbul ignore next */
const ContentMessage = GetLoadable<ContentMessageProps>(() =>
  import('../../components/content-message')
)
/* istanbul ignore next */
const NotFound = GetLoadable(() => import('../not-found'))

const mapStateToProps = (state: AppState) => ({
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

export interface FilmContainerProps {
  match: {
    params: { id: string }
  }
  film?: Film
  filmIsFetching: boolean
  filmError?: Error
  genre?: string
  relatedFilms: Film[]
  relatedFilmsIsFetching: boolean
  relatedFilmsError?: Error
  fetchFilm(id: number): void
  reFetchFilms(): void
}

export class FilmContainer extends React.Component<FilmContainerProps> {
  constructor(props: FilmContainerProps) {
    super(props)

    if (IS_SERVER) {
      this.initialLoad(props)
    }
  }

  initialLoad(props: FilmContainerProps) {
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

  componentDidUpdate(prevProps: FilmContainerProps) {
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

  loadFilm(id: string) {
    this.props.fetchFilm(parseInt(this.props.match.params.id, 10))
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
      <>
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
            <NavigateButton to="/search" primary small>
              Search
            </NavigateButton>
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
      </>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilmContainer)
