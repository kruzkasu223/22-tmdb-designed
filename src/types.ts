export type ResponseError = {
  status_message?: string
  status_code?: number
}

export type SearchMoviesResponseSuccess = {
  page?: number
  results?: SearchMoviesResultSuccess[]
  total_pages?: number
  total_results?: number
}

export type SearchMoviesResultSuccess = {
  adult?: boolean
  backdrop_path?: string | null
  genre_ids?: number[]
  id: number
  original_language?: string
  original_title?: string
  overview?: string
  popularity?: number
  poster_path?: string | null
  release_date?: string
  title?: string
  video?: boolean
  vote_average?: number
  vote_count?: number
}

export type MovieDetails = {
  adult?: boolean
  backdrop_path?: string | null
  belongs_to_collection?: BelongsToCollection | null
  budget?: number
  genres?: Genre[]
  homepage?: string | null
  id: number
  imdb_id?: string | null
  original_language?: string
  original_title?: string
  overview?: string | null
  popularity?: number
  poster_path?: string | null
  production_companies?: ProductionCompany[]
  production_countries?: ProductionCountry[]
  release_date?: string
  revenue?: number
  runtime?: number | null
  spoken_languages?: SpokenLanguage[]
  status?: string
  tagline?: string | null
  title?: string
  video?: boolean
  vote_average?: number
  vote_count?: number
}

export type BelongsToCollection = {
  id: number
  name?: string
  poster_path?: string
  backdrop_path?: string
}

export type Genre = {
  id: number
  name?: string
}

export type ProductionCompany = {
  id: number
  logo_path?: string | null
  name?: string
  origin_country?: string
}

export type ProductionCountry = {
  iso_3166_1?: string
  name?: string
}

export type SpokenLanguage = {
  english_name?: string
  iso_639_1?: string
  name?: string
}
