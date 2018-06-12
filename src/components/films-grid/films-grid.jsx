// @flow

import React from 'react'

import './films-grid.css'

import { FilmsGridItem } from './films-grid-item'

type FilmsGridProps = {
  films: Array<Object>
}

export function FilmsGrid(props: FilmsGridProps) {
  return (
    <div className="film-grid padding-content" data-cy="film-grid">
      {props.films.map(film => <FilmsGridItem film={film} key={film.id} />)}
    </div>
  )
}

export default FilmsGrid
