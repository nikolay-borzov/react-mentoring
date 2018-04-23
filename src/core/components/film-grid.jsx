import React from 'react'

import { FilmGridItem } from './film-grid-item'

export class FilmGrid extends React.PureComponent {
  constructor(props) {
    super(props)

    const movies = []

    for (let i = 0; i < 20; i++) {
      movies.push({
        id: i,
        title: 'Gemini',
        tagline: '',
        vote_average: 10,
        vote_count: 3,
        release_date: '2018-03-30',
        poster_path:
          'https://image.tmdb.org/t/p/w500/oIltQs7MPk7VQFG3DJfgC63mShU.jpg',
        overview:
          'A heinous crime tests the complex relationship between a tenacious personal assistant and her Hollywood starlet boss. As the assistant travels across Los Angeles to unravel the mystery, she must stay one step ahead of a determined policeman and confront her own understanding of friendship, truth and celebrity.',
        budget: 0,
        revenue: 0,
        genres: ['Mystery', 'Thriller'],
        runtime: 92
      })
    }

    this.films = movies
  }

  render() {
    return (
      <div className="film-grid">
        {this.films.map(film => <FilmGridItem film={film} key={film.id} />)}
      </div>
    )
  }
}
