import axios from 'axios'

// TODO: Replace with redux-axios-middleware?
const filmService = {
  /**
   * @param {Object} params Search params
   * @param {string} params.search Search term
   * @param {string} params.searchBy
   * @param {string} params.sortBy
   * @param {string} params.sortOrder
   * @param {string} params.limit
   */
  getFilms(params) {
    return axios.get('/movies', {
      params
    })
  },

  getFilm(id) {
    return axios.get(`/movies/${id}`)
  }
}

export default filmService
