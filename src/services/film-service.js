import axios from 'axios'

const filmService = {
  /**
   * @param {QueryParams} queryParams
   */
  getFilms(queryParams) {
    return axios
      .get('/movies', {
        params: queryParams.getParams()
      })
      .then(({ data }) => data)
  },

  getFilm(id) {
    // TODO: Extract data globally
    return axios.get(`/movies/${id}`).then(({ data }) => data)
  }
}

export default filmService
