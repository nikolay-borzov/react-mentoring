import axios from 'axios'

export const filmService = {
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
    return axios.get(`/movies/${id}`).then(({ data }) => data)
  }
}