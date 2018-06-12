import apiService from './api-service'

import axios from 'axios'

jest.mock('axios', () => ({
  defaults: {
    baseURL: '/'
  },
  interceptors: {
    response: {
      use: jest.fn()
    }
  }
}))

describe('apiService', () => {
  beforeEach(() => {
    axios.initialized = false
  })

  it('sets default for axios', () => {
    global.API_URL = 'http://api.some.com'
    apiService.init()

    expect(axios.defaults.baseURL).toBe(global.API_URL)
  })

  it('adds interceptor extracting data property value', () => {
    const interceptors = []
    const resultWithData = {
      data: 'result'
    }
    const resultWithoutData = {
      foo: 'result'
    }

    axios.interceptors.response.use.mockImplementation(interceptor => {
      interceptors.push(interceptor)
    })

    apiService.init()

    expect(interceptors[0](resultWithData)).toBe(resultWithData.data)
    expect(interceptors[0](resultWithoutData)).toBe(resultWithoutData)

    // it doesn't add interceptor on second call
    apiService.init()

    expect(interceptors).toHaveLength(1)
  })
})
