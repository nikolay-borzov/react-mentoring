export class QueryParams {
  constructor() {
    this._search = ''
    this._searchBy = ''
    this._sortBy = ''
    this._sortOrder = ''
    this._limit = 15
  }

  getParams() {
    return {
      search: this._search,
      searchBy: this._searchBy,
      sortBy: this._sortBy,
      sortOrder: this._sortOrder,
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

  sortOrder(_sortOrder) {
    this._sortOrder = _sortOrder
    return this
  }

  limit(limit) {
    this._limit = limit
    return this
  }
}
