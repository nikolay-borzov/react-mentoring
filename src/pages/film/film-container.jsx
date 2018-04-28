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
  ToastError
} from '../../components'

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
      film: null
    }
  }

  componentDidMount() {
    const queryStringParams = new URLSearchParams(location.search)

    filmService
      .getFilm(queryStringParams.get('id'))
      .then(film => {
        this.setState({
          film,
          isFilmLoaded: true
        })
      })
      .catch(error => {
        this.setState({
          error,
          isFilmLoaded: true
        })

        toast.error(<ToastError message="Unable to load movie" error={error} />)
      })
  }

  render() {
    return (
      <React.Fragment>
        <Header>
          <SiteName />
          <LoadingBlock isLoaded={this.state.isFilmLoaded}>
            <pre>{JSON.stringify(this.state.film, null, 2)}</pre>
          </LoadingBlock>
        </Header>
        <main className="content">
          <LoadingBlock isLoaded={false}>
            <p>TODO: Films by the same genre</p>
          </LoadingBlock>
        </main>
        <Footer />
      </React.Fragment>
    )
  }
}
