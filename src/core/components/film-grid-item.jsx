import React from 'react'
import PropTypes from 'prop-types'

export class FilmGridItem extends React.PureComponent {
  static propTypes = {
    film: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.film = this.props.film
  }

  render() {
    return (
      <div className="film-grid-item" tabIndex={0}>
        <img className="film-grid-item__cover" src={this.film.poster_path} />

        <div className="film-grid-item__row film-grid-item__title">
          <span className="uppercase font-bold">{this.film.title}</span>
          <span className="film-grid-item__date font-small color-alt">
            {this.film.release_date.substring(0, 4)}
          </span>
        </div>

        <div className="film-grid-item__row color-alt">
          {this.film.genres.join(', ')}
        </div>
      </div>
    )
  }
}
