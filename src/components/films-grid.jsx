import React from 'react'
import PropTypes from 'prop-types'

import './films-grid.css'

import { FilmsGridItem } from './films-grid-item'

export class FilmsGrid extends React.PureComponent {
  static propTypes = {
    films: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  render() {
    return (
      <div className="film-grid">
        {this.props.films.map(film => (
          <FilmsGridItem film={film} key={film.id} />
        ))}
      </div>
    )
  }
}
