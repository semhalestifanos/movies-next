const TMDB_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTc1NmY2MjMwNGU3ZWUyMDU0MWJhZTk1ZWEyODEzMyIsIm5iZiI6MTc1NjEyNTY3MS41NDQsInN1YiI6IjY4YWM1OWU3MjAyMDcyMmY1YTFlNTBmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rnfiJQIErwK6r4uc6O0e2X9vRkNm7V-re88sR8ymYM8'
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string
  backdrop_path: string
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  adult: boolean
  original_language: string
  original_title: string
  popularity: number
  video: boolean
}

export interface TVShow {
  id: number
  name: string
  overview: string
  poster_path: string
  backdrop_path: string
  first_air_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  adult: boolean
  original_language: string
  original_name: string
  popularity: number
  origin_country: string[]
}

export interface TMDBResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface Genre {
  id: number
  name: string
}

const tmdbFetch = async (endpoint: string) => {
  const response = await fetch(`${TMDB_BASE_URL}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${TMDB_API_KEY}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.statusText}`)
  }

  return response.json()
}

export const fetchLatestMovies = async (page = 1): Promise<TMDBResponse<Movie>> => {
  return tmdbFetch(`/movie/now_playing?page=${page}&sort_by=release_date.desc`)
}

export const fetchLatestTVShows = async (page = 1): Promise<TMDBResponse<TVShow>> => {
  return tmdbFetch(`/tv/on_the_air?page=${page}&sort_by=first_air_date.desc`)
}

export const fetchPopularMovies = async (page = 1): Promise<TMDBResponse<Movie>> => {
  return tmdbFetch(`/movie/popular?page=${page}`)
}

export const fetchPopularTVShows = async (page = 1): Promise<TMDBResponse<TVShow>> => {
  return tmdbFetch(`/tv/popular?page=${page}`)
}

export const fetchTrendingMovies = async (timeWindow: 'day' | 'week' = 'week'): Promise<TMDBResponse<Movie>> => {
  return tmdbFetch(`/trending/movie/${timeWindow}`)
}

export const fetchTrendingTVShows = async (timeWindow: 'day' | 'week' = 'week'): Promise<TMDBResponse<TVShow>> => {
  return tmdbFetch(`/trending/tv/${timeWindow}`)
}

export const searchMovies = async (query: string, page = 1): Promise<TMDBResponse<Movie>> => {
  return tmdbFetch(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`)
}

export const searchTVShows = async (query: string, page = 1): Promise<TMDBResponse<TVShow>> => {
  return tmdbFetch(`/search/tv?query=${encodeURIComponent(query)}&page=${page}`)
}

export const fetchMovieDetails = async (movieId: number) => {
  return tmdbFetch(`/movie/${movieId}`)
}

export const fetchTVShowDetails = async (tvId: number) => {
  return tmdbFetch(`/tv/${tvId}`)
}

export const fetchMovieGenres = async (): Promise<{ genres: Genre[] }> => {
  return tmdbFetch('/genre/movie/list')
}

export const fetchTVGenres = async (): Promise<{ genres: Genre[] }> => {
  return tmdbFetch('/genre/tv/list')
}

export const getImageUrl = (path: string, size: 'w200' | 'w300' | 'w400' | 'w500' | 'w780' | 'original' = 'w500') => {
  if (!path) return '/placeholder.svg'
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

export const getBackdropUrl = (path: string, size: 'w300' | 'w780' | 'w1280' | 'original' = 'w1280') => {
  if (!path) return '/placeholder.svg'
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}
