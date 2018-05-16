import axios from 'axios'

const apiService = {
  init() {
    axios.defaults.baseURL = API_URL
    // Extract data value if data property is specified
    axios.interceptors.response.use(
      response => (response.data ? response.data : response)
    )
  }
}

export default apiService
