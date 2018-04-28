import React from 'react'
import PropTypes from 'prop-types'

import './films-grid-item.css'

import ImageLoader from 'react-load-image'
import { ImageLoading } from '../image-loading'

FilmsGridItem.propTypes = {
  film: PropTypes.object.isRequired
}

export function FilmsGridItem(props) {
  return (
    <a href={`?id=${props.film.id}`} className="film-grid-item" tabIndex={0}>
      <ImageLoader src={props.film.poster_path}>
        <img className="film-grid-item__cover" title={props.film.overview} />
        <div>Error</div>
        <ImageLoading />
      </ImageLoader>

      <div className="film-grid-item__info">
        <div className="film-grid-item__row film-grid-item__title">
          <span className="uppercase font-bold">{props.film.title}</span>
          <span className="film-grid-item__date font-small color-alt">
            {props.film.release_date.substring(0, 4)}
          </span>
        </div>

        <div className="film-grid-item__row color-alt">
          {props.film.genres.join(', ')}
        </div>
      </div>
    </a>
  )
}
