import React from 'react'
import styled from 'styled-components'

import { FilmsGridItem } from './films-grid-item'
import { Film } from '../../entities/film'

const FilmGrid = styled.div`
  display: grid;
  grid-gap: 3.5rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 300px));
  justify-content: center;
`

export interface FilmsGridProps {
  films: Film[]
}

export const FilmsGrid: React.FunctionComponent<FilmsGridProps> = props => (
  <FilmGrid className="padding-content" data-cy="film-grid">
    {props.films.map(film => (
      <FilmsGridItem film={film} key={film.id} />
    ))}
  </FilmGrid>
)

export default FilmsGrid
