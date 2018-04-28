import React from 'react'
import PropTypes from 'prop-types'

import './films-grid.css'

import { FilmsGridItem } from './films-grid-item'

FilmsGrid.propTypes = {
  films: PropTypes.arrayOf(PropTypes.object).isRequired
}

export function FilmsGrid(props) {
  return (
    <div className="film-grid">
      {props.films.map(film => <FilmsGridItem film={film} key={film.id} />)}
    </div>
  )
}
