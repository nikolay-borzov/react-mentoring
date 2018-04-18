import React from 'react'

export class SeachForm extends React.PureComponent {
  render() {
    return (
      <div className="search-form-container alt-background">
        <form name="search-form">
          <div className="form-row">
            <label className="form-label">Find your movie</label>
          </div>
          <div className="form-row">
            <input type="text" className="text-input" />
          </div>
          <div className="form-row">
            <label className="form-label">Search by</label>
            <div className="radio-input">
              <input
                type="radio"
                id="searchBy_title"
                name="searchBy"
                value="title"
              />
              <label
                htmlFor="searchBy_title"
                className="radio-input__label button button--small">
                Title
              </label>
            </div>
            <div className="radio-input">
              <input
                type="radio"
                id="searchBy_director"
                name="searchBy"
                value="director"
              />
              <label
                htmlFor="searchBy_director"
                className="radio-input__label button button--small">
                Director
              </label>
            </div>
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
