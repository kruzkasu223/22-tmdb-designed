import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { env } from "~/env.mjs"
import type {
  MovieDetails,
  ResponseError,
  SearchMoviesResponseSuccess,
} from "~/types"

const UNKNOWN_API_ERROR = "unknown api error"

const API_KEY = env.SERVER_API_KEY
const API_URL = `https://api.themoviedb.org/3`
const API_URL_MOVIE = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
const API_URL_MOVIE_BY_ID = (id: number) =>
  `${API_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
const API_URL_SEARCH = (query: string) =>
  `${API_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${query}`

export const moviesRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ query: z.string() }).optional())
    .query(async ({ input }) => {
      const apiUrl = input?.query ? API_URL_SEARCH(input.query) : API_URL_MOVIE

      try {
        const res = await fetch(apiUrl)
        if (!res.ok) {
          const error = (await res.json()) as ResponseError | unknown
          if (
            error &&
            typeof error === "object" &&
            "status_message" in error &&
            typeof error.status_message === "string"
          ) {
            throw Error(error.status_message || UNKNOWN_API_ERROR)
          }
        }
        return (await res.json()) as SearchMoviesResponseSuccess
      } catch (error) {
        console.error(error)
        throw Error(UNKNOWN_API_ERROR)
      }
    }),
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      if (!input.id) throw Error("id is required")

      try {
        const res = await fetch(API_URL_MOVIE_BY_ID(input.id))
        if (!res.ok) {
          const error = (await res.json()) as ResponseError | unknown
          if (
            error &&
            typeof error === "object" &&
            "status_message" in error &&
            typeof error.status_message === "string"
          ) {
            throw Error(error.status_message || UNKNOWN_API_ERROR)
          }
        }
        return (await res.json()) as MovieDetails
      } catch (error) {
        console.error(error)
        throw Error(UNKNOWN_API_ERROR)
      }
    }),
})
