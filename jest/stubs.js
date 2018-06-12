export const film = {
  id: 1,
  title: 'Film title',
  poster_path: 'https://picsum.photos/g/300/450/?random',
  overview: 'Film overview',
  release_date: '2018-05-04',
  genres: ['some genre', 'another genre'],
  vote_average: 7.5
}

export const films = [film]

function getRandomImageId() {
  // https://picsum.photos/images
  return Math.floor(Math.random() * Math.floor(1084))
}

export function getRandomFilm(id) {
  return {
    ...film,
    id,
    poster_path: film.poster_path.replace(
      'random',
      `image=${getRandomImageId()}`
    )
  }
}
