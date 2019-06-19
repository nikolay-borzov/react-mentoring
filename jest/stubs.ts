import { Film } from '../src/entities/film'

export const film: Film = {
  id: 1,
  title: 'Film title',
  tagline: 'Put that cookie down',
  vote_average: 7.5,
  vote_count: 667,
  release_date: '2018-05-04',
  poster_path: 'https://picsum.photos/g/300/450/?random',
  overview: 'Once upon a time...',
  budget: 15000000,
  revenue: 59735548,
  genres: ['some genre', 'another genre']
}

export const films = [film]

function getRandomImageId() {
  // https://picsum.photos/images
  return Math.floor(Math.random() * Math.floor(1084))
}

export function getRandomFilm(id: number) {
  return {
    ...film,
    id,
    poster_path: film.poster_path.replace(
      'random',
      `image=${getRandomImageId()}`
    )
  }
}
