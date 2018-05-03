import React from 'react'
import PropTypes from 'prop-types'

import './search-form.css'

import { searchBy } from '../../../enums'

import { Radio } from '../../../components'

export class SearchForm extends React.PureComponent {
  static propTypes = {
    search: PropTypes.string.isRequired,
    searchBy: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired
  }

  searchByOptions = [
    {
      name: 'Title',
      value: searchBy.title
    },
    {
      name: 'Genre',
      value: searchBy.genres
    }
  ]

  onSubmit = event => {
    event.preventDefault()

    this.props.onSearchChange({
      search: this.searchInput.value,
      searchBy: this.searchByInput.value
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
              ref={input => (this.searchInput = input)}
              type="text"
              className="text-input"
              defaultValue={this.props.search}
            />
          </div>

          <div className="form-row uppercase">
            <Radio
              ref={input => (this.searchByInput = input)}
              name="searchBy"
              label="Search by"
              defaultValue={this.props.searchBy}
              options={this.searchByOptions}
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