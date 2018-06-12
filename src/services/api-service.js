import axios from 'axios'

const apiService = {
  init() {
    // Prevent multiple calls (happens during dev-server recompile)
    if (axios.initialized) {
      return
    }

    axios.defaults.baseURL = API_URL
    // Extract data value if data property is specified
    axios.interceptors.response.use(
      response => (response.data ? response.data : response)
    )
    axios.initialized = true
  }
}

export default apiService
