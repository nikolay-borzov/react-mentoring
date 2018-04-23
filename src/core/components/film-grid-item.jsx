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
      <div className="film-grid-item">
        <div className="film-grid-item__cover">
          <img src={this.film.poster_path} />
        </div>
      </div>
    )
  }
}
