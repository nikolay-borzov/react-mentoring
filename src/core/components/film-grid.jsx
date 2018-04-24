import React from 'react'
import PropTypes from 'prop-types'

import { FilmGridItem } from './film-grid-item'

export class FilmGrid extends React.PureComponent {
  static propTypes = {
    films: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  render() {
    return (
      <div className="film-grid">
        {this.props.films.map(film => (
          <FilmGridItem film={film} key={film.id} />
        ))}
      </div>
    )
  }
}
