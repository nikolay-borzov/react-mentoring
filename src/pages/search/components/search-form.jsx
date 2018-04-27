import React from 'react'
import PropTypes from 'prop-types'

import './search-form.css'

import { searchBy } from '../../../enums'

import { Radio } from '../../../components'

export class SeachForm extends React.PureComponent {
  static propTypes = {
    search: PropTypes.string.isRequired,
    searchBy: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      search: this.props.search,
      searchBy: this.props.searchBy
    }

    this.searchByOptions = [
      {
        name: 'Title',
        value: searchBy.title
      },
      {
        name: 'Genre',
        value: searchBy.genres
      }
    ]
  }

  onSearchChange = event => {
    this.setState({ search: event.target.value })
  }

  onSearchByChange = searchBy => {
    this.setState({ searchBy })
  }

  onSubmit = event => {
    event.preventDefault()

    this.props.onSearchChange({
      search: this.state.search,
      searchBy: this.state.searchBy
    })
  }

  render() {
    return (
      <div className="search-form-container">
        <form name="search-form" onSubmit={this.onSubmit}>
          <div className="form-row">
            <label className="form-label uppercase">Find your movie</label>
          </div>

          <div className="form-row">
            <input
              type="text"
              className="text-input"
              value={this.state.search}
              onChange={this.onSearchChange}
            />
          </div>

          <div className="form-row uppercase">
            <Radio
              name="searchBy"
              label="Search by"
              value={this.state.searchBy}
              options={this.searchByOptions}
              onChange={this.onSearchByChange}
              style="button"
            />

            <div className="flex-grow align-right">
              <input
                type="submit"
                className="button button--primary"
                value="Search"
              />
            </div>
          </div>
        </form>
      </div>
    )
  }
}
