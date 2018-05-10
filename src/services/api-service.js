import axios from 'axios'

const apiService = {
  init() {
    axios.defaults.baseURL = API_URL
  }
}

export default apiService
