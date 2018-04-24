import axios from 'axios'

export function configureAjax() {
  axios.defaults.baseURL = API_URL
}
