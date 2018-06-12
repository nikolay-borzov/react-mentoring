// @flow

import React from 'react'

import './search-form.css'

import { searchBy } from '../../../enums'

import { Radio } from '../../../components'

type SearchFormProps = {
  search: string,
  searchBy: string,
  onSearchChange: ({ search: string, searchBy: string }) => void
}

export class SearchForm extends React.PureComponent<SearchFormProps> {
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

  onSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    this.props.onSearchChange({
      search: this.searchInput.value,
      searchBy: this.searchByInput.value
    })
  }

  render() {
    const { search, searchBy } = this.props

    return (
      <div className="search-form-container">
        <form name="search-form" onSubmit={this.onSubmit}>
          <div className="form-row">
            <label className="form-label uppercase">Find your movie</label>
          </div>

          <div className="form-row">
            <input
              name="search"
              ref={input => (this.searchInput = input)}
              type="text"
              className="text-input"
              defaultValue={search}
            />
          </div>

          <div className="form-row uppercase">
            <Radio
              ref={input => (this.searchByInput = input)}
              name="searchBy"
              label="Search by"
              defaultValue={searchBy}
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
