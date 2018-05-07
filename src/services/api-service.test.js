import apiService from './api-service'

import axios from 'axios'
jest.mock('axios', () => ({
  defaults: {
    baseURL: '/'
  }
}))

describe('apiService', () => {
  it('sets default for axios', () => {
    global.API_URL = 'http://api.some.com'
    apiService.init()

    expect(axios.defaults.baseURL).toBe(global.API_URL)
  })
})
