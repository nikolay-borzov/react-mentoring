export interface Film {
  id: number
  title: string
  tagline: string
  poster_path: string
  vote_average: number
  vote_count: number
  genres: string[]
  /** ISO Date string (e.g. "2018-02-07") */
  release_date: string
  overview: string
  budget: number
  revenue: number
}
