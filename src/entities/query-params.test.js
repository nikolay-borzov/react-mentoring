import { QueryParams } from './query-params'

describe('QueryParams entity', () => {
  let params

  const itSetsParam = (paramName, value) => {
    it(`sets '${paramName}' parameter`, () => {
      params[paramName](value)

      expect(params.getParams()).toMatchObject({
        [paramName]: value
      })
    })
  }

  const testParams = {
    search: 'search',
    searchBy: 'searchBy',
    sortBy: 'sortBy',
    sortOrder: 'sortOrder',
    limit: 50
  }

  beforeEach(() => {
    params = new QueryParams()
  })

  it(`sets default values`, () => {
    expect(params.getParams()).toEqual({
      search: '',
      searchBy: '',
      sortBy: '',
      sortOrder: '',
      limit: 15
    })
  })

  // Generate param setters test cases
  Object.entries(testParams).forEach(([key, value]) => itSetsParam(key, value))
})
