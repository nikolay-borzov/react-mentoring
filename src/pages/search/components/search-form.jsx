// @flow

import * as React from 'react'
import styled from 'styled-components'

import { searchBy } from '../../../enums'

import { Radio } from '../../../components'
import { Button, FormRow, FormLabel } from '../../../styles'

type SearchFormProps = {
  search: string,
  searchBy: string,
  onSearchChange: ({ search: string, searchBy: string }) => void
}

const SearchFormContainer = styled.div`
  margin-top: 1rem;
`

const SearchInput = styled.input`
  width: 100%;
  font-family: 'Regular';
  font-size: 1.3rem;
  background-color: var(--color-bc-alt);
  border: none;
  border-bottom: 2px solid var(--color-primary);
  padding: var(--padding-input);
  color: var(--color-text-light);
`

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

  searchInput: ?HTMLInputElement
  searchByInput: ?Radio

  constructor(props) {
    super(props)

    this.searchInput = React.createRef()
    this.searchByInput = React.createRef()
  }

  onSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    const searchInput = this.searchInput.current
    const searchByInput = this.searchByInput.current

    if (searchInput && searchByInput) {
      this.props.onSearchChange({
        search: searchInput.value,
        searchBy: searchByInput.value
      })
    }
  }

  render() {
    const { search, searchBy } = this.props

    return (
      <SearchFormContainer>
        <form name="search-form" onSubmit={this.onSubmit}>
          <FormRow>
            <FormLabel className="uppercase">Find your movie</FormLabel>
          </FormRow>

          <FormRow>
            <SearchInput
              name="search"
              innerRef={this.searchInput}
              type="text"
              defaultValue={search}
            />
          </FormRow>

          <FormRow className="uppercase">
            <Radio
              ref={this.searchByInput}
              name="searchBy"
              label="Search by"
              defaultValue={searchBy}
              options={this.searchByOptions}
              style="button"
            />

            <div className="flex-grow align-right">
              <Button type="submit" primary value="Search" />
            </div>
          </FormRow>
        </form>
      </SearchFormContainer>
    )
  }
}
