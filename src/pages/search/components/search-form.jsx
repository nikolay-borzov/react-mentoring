import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import {
  selectors,
  setSearch,
  setSearchBy
} from '../../../redux/modules/search'

import './search-form.css'

import { searchBy } from '../../../enums'

import { Radio } from '../../../components'

export class SearchForm extends React.PureComponent {
  static propTypes = {
    search: PropTypes.string.isRequired,
    searchBy: PropTypes.string.isRequired,
    // onSearchChange: PropTypes.func.isRequired,
    setSearch: PropTypes.func.isRequired,
    setSearchBy: PropTypes.func.isRequired
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

    const { setSearch, setSearchBy } = this.props

    setSearch(this.searchInput.value)
    setSearchBy(this.searchByInput.value)
    // fetchFilms()
    /* this.props.onSearchChange({
      search: this.searchInput.value,
      searchBy: this.searchByInput.value
    }) */
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

const mapStateToProps = state => ({
  search: selectors.search(state),
  searchBy: selectors.searchBy(state)
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setSearch, setSearchBy }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)
