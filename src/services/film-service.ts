import axios, { AxiosResponse } from 'axios'

import { Film } from '../entities/film'

export type SearchBy = 'title' | 'genres'
export type SortBy = 'release_date' | 'vote_average'
export type SortOrder = 'desc' | 'asc'

export interface GetFilmsParams {
  /** Search value */
  search?: string
  /** Type of search (title or genres) */
  searchBy?: SearchBy
  sortBy?: SortBy
  /** Value to define sort direction - 'desc' or 'asc' */
  sortOrder?: SortOrder
  /** Array to filter by genres */
  filter?: string[]
  /** Limit amount of items in result array for pagination. `10` by default */
  limit?: number
  /** Offset in result array for pagination */
  offset?: number
}

export interface DataResponse<TData> {
  data: TData[]
  total: number
  offset: number
  limit: number
}

function extractData<T>(response: AxiosResponse<T>) {
  return response.data
}

// TODO: Replace with redux-axios-middleware?
const filmService = {
  getFilms(params: GetFilmsParams) {
    return axios
      .get<DataResponse<Film>>('/movies', {
        params
      })
      .then(extractData)
  },

  getFilm(id: number) {
    return axios.get<Film>(`/movies/${id}`).then(extractData)
  }
}

export default filmService
