export class QueryParams {
  constructor() {
    this._search = ''
    this._searchBy = 'title'
    this._sortBy = ''
    this._limit = 15
  }

  getParams() {
    return {
      search: this._search,
      searchBy: this._searchBy,
      sortBy: this._sortBy,
      limit: this._limit
    }
  }

  search(search) {
    this._search = search
    return this
  }

  searchBy(searchBy) {
    this._searchBy = searchBy
    return this
  }

  sortBy(sortBy) {
    this._sortBy = sortBy
    return this
  }

  limit(limit) {
    this._limit = limit
    return this
  }
}
