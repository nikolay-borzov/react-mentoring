import React from 'react'

import { Radio } from '../core/components/radio'

export class SeachForm extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      searchByOptions: [
        {
          name: 'Title',
          value: 'title'
        },
        {
          name: 'Director',
          value: 'director'
        }
      ]
    }
  }

  // TODO: Move to props
  onSearchByChange(value) {
    console.log('onSearchByChange', value)
  }

  render() {
    return (
      <div className="search-form-container">
        <form name="search-form">
          <div className="form-row">
            <label className="form-label uppercase">Find your movie</label>
          </div>

          <div className="form-row">
            <input type="text" className="text-input" />
          </div>

          <div className="form-row uppercase">
            <Radio
              name="searchBy"
              label="Search by"
              value="title"
              options={this.state.searchByOptions}
              onChange={this.onSearchByChange.bind(this)}
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
