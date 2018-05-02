import axios from 'axios'

export const apiService = {
  init() {
    axios.defaults.baseURL = API_URL
  }
}
