import React from 'react'
import PropTypes from 'prop-types'

import './film-details.css'

import { ContentImage } from '../../../components'

FilmDetails.propTypes = {
  film: PropTypes.object
}

export function FilmDetails(props) {
  const content = props.film ? (
    <React.Fragment>
      <div className="film-details__image">
        <ContentImage src={props.film.poster_path} alt={props.film.title} />
      </div>

      <div className="film-details__description">
        <div className="flex flex-align-center">
          <h1>{props.film.title} </h1>
          <span className="film-details__rating">
            {props.film.vote_average}
          </span>
        </div>

        <p className="font-size-big">{props.film.genres.join(', ')}</p>

        <p className="font-bold">{props.film.release_date.substring(0, 4)}</p>

        <p className="font-size-big">{props.film.overview}</p>
      </div>
    </React.Fragment>
  ) : (
    <div className="error-message centered">Unable to load the movie</div>
  )

  return <div className="film-details flex padding-content">{content}</div>
}
