// @flow

import React from 'react'

import './film-details.css'

import { ContentImage } from '../../../components'

type FilmDetailsProps = {
  film: Film
}

export function FilmDetails(props: FilmDetailsProps) {
  const film: Film = props.film || {}

  const {
    poster_path: posterPath,
    title,
    vote_average: voteAverage,
    genres,
    release_date: releaseDate,
    overview
  } = film

  const content = film.id ? (
    <React.Fragment>
      <div className="film-details__image">
        <ContentImage src={posterPath} alt={title} />
      </div>

      <div className="film-details__description">
        <div className="flex flex-align-center">
          <h1>{title}</h1>
          <span className="film-details__rating">{voteAverage}</span>
        </div>

        <p className="font-size-big">{genres.join(', ')}</p>

        <p className="font-bold">{releaseDate.substring(0, 4)}</p>

        <p className="font-size-big">{overview}</p>
      </div>
    </React.Fragment>
  ) : (
    <div className="error-message centered">Unable to load the movie</div>
  )

  return <div className="film-details flex padding-content">{content}</div>
}
