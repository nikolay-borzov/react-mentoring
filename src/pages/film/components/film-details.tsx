import React from 'react'
import styled from 'styled-components'

import { ContentImage } from '../../../components'
import { media } from '../../../styles/media'
import { Film } from '../../../entities/film'

export interface FilmDetailsProps {
  film?: Film
}

const FilmDetailsStyled = styled.div`
  @media (max-width: 600px) {
    flex-direction: column;
  }
`

const FilmDetailsImage = styled.div`
  display: flex;
  justify-items: center;
  flex: 1 1 auto;
  min-width: 300px;
  max-width: 500px;
`

const FilmDetailsDescription = styled.div`
  flex: 1 1 100%;
  padding-left: 2rem;

  @media (max-width: 600px) {
    padding-left: 0;
  }

  ${media.bigger`padding-left: 4rem;`};
`

const FilmDetailsRating = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-primary);
  font-size: 120%;
  font-weight: bold;
  width: 2rem;
  height: 2rem;
  padding: 1.2rem;
  border-radius: 100%;
  border: solid 3px var(--color-primary);
  margin-left: 2rem;
`

export const FilmDetails: React.FunctionComponent<FilmDetailsProps> = props => {
  let content

  if (props.film && props.film.id) {
    const {
      poster_path: posterPath,
      title,
      vote_average: voteAverage,
      genres,
      release_date: releaseDate,
      overview
    } = props.film

    content = (
      <>
        <FilmDetailsImage>
          <ContentImage src={posterPath} alt={title} />
        </FilmDetailsImage>

        <FilmDetailsDescription>
          <div className="flex flex-align-center">
            <h1>{title}</h1>
            <FilmDetailsRating>{voteAverage}</FilmDetailsRating>
          </div>

          <p className="font-size-big">{genres.join(', ')}</p>

          <p className="font-bold">{releaseDate.substring(0, 4)}</p>

          <p className="font-size-big">{overview}</p>
        </FilmDetailsDescription>
      </>
    )
  } else {
    content = (
      <div className="error-message centered">Unable to load the movie</div>
    )
  }

  return (
    <FilmDetailsStyled className="flex padding-content">
      {content}
    </FilmDetailsStyled>
  )
}
