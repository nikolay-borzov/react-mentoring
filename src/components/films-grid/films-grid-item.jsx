// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ContentImage } from '../'

type FilmsGridItemProps = {
  film: Film
}

const FilmGridItem = styled(Link)`
  display: flex;
  flex-direction: column;
  color: var(--color-default);
  text-decoration: none;
`

const FilmGridItemInfo = styled.div`
  margin-top: 0.5rem;
`

const FilmGridItemRow = styled.div`
  padding: 0.4rem 0.5rem;
`

const FilmGridItemTitle = styled(FilmGridItemRow)`
  display: flex;
  justify-content: space-between;
  align-items: start;
`

const FilmGridItemDate = styled.span`
  border: solid 1px var(--color-alt);
  padding: 0.1rem 0.5rem;
  border-radius: 0.2rem;
  margin-left: 1rem;
`

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
    <FilmGridItem
      to={`/film/${id}`}
      className="hover-effect"
      tabIndex={0}
      data-cy="film-grid-item">
      <ContentImage src={posterPath} alt={title} title={overview} />

      <FilmGridItemInfo>
        <FilmGridItemTitle>
          <span className="uppercase font-bold">{title}</span>
          <FilmGridItemDate>{releaseDate.substring(0, 4)}</FilmGridItemDate>
        </FilmGridItemTitle>

        <FilmGridItemRow className="color-alt">
          {props.film.genres.join(', ')}
        </FilmGridItemRow>
      </FilmGridItemInfo>
    </FilmGridItem>
  )
}
