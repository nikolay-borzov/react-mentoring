import React from 'react'
import PropTypes from 'prop-types'

import './film-details.css'

import { ContentImage } from '../../../components'

FilmDetails.propTypes = {
  film: PropTypes.object.isRequired
}

export function FilmDetails(props) {
  return (
    <div className="film-details flex padding-content">
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

        <p className="font-big">{props.film.genres.join(', ')}</p>

        <p className="font-bold">{props.film.release_date.substring(0, 4)}</p>

        <p className="font-big">{props.film.overview}</p>
      </div>
    </div>
  )
}
