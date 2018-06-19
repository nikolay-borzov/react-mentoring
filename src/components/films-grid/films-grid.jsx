// @flow

import React from 'react'
import styled from 'styled-components'

import { FilmsGridItem } from './films-grid-item'

type FilmsGridProps = {
  films: Array<Film>
}

const FilmGrid = styled.div`
  display: grid;
  grid-gap: 3.5rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 300px));
  justify-content: center;
`

export function FilmsGrid(props: FilmsGridProps) {
  return (
    <FilmGrid className="padding-content" data-cy="film-grid">
      {props.films.map(film => <FilmsGridItem film={film} key={film.id} />)}
    </FilmGrid>
  )
}

export default FilmsGrid
