import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './films-grid-item.css'

import { ContentImage } from '../'

FilmsGridItem.propTypes = {
  film: PropTypes.object.isRequired
}

export function FilmsGridItem(props) {
  return (
    <Link
      to={`/film/${props.film.id}`}
      className="film-grid-item hover-effect"
      tabIndex={0}
      data-cy="film-grid-item">
      <ContentImage
        src={props.film.poster_path}
        alt={props.film.title}
        title={props.film.overview}
      />

      <div className="film-grid-item__info">
        <div className="film-grid-item__row film-grid-item__title">
          <span className="uppercase font-bold">{props.film.title}</span>
          <span className="film-grid-item__date font-size-small color-alt">
            {props.film.release_date.substring(0, 4)}
          </span>
        </div>

        <div className="film-grid-item__row color-alt">
          {props.film.genres.join(', ')}
        </div>
      </div>
    </Link>
  )
}
