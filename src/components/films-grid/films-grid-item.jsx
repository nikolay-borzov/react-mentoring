// @flow

import React from 'react'
import { Link } from 'react-router-dom'

import './films-grid-item.css'

import { ContentImage } from '../'

type FilmsGridItemProps = {
  film: Object
}

export function FilmsGridItem(props: FilmsGridItemProps) {
  const {
    film: {
      id,
      poster_path: posterPath,
      title,
      overview,
      release_date: releaseDate
    }
  } = props

  return (
    <Link
      to={`/film/${id}`}
      className="film-grid-item hover-effect"
      tabIndex={0}
      data-cy="film-grid-item">
      <ContentImage src={posterPath} alt={title} title={overview} />

      <div className="film-grid-item__info">
        <div className="film-grid-item__row film-grid-item__title">
          <span className="uppercase font-bold">{title}</span>
          <span className="film-grid-item__date font-size-small color-alt">
            {releaseDate.substring(0, 4)}
          </span>
        </div>

        <div className="film-grid-item__row color-alt">
          {props.film.genres.join(', ')}
        </div>
      </div>
    </Link>
  )
}
