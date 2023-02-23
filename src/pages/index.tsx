import { type NextPage } from "next"
import Head from "next/head"
import { useMemo, useState } from "react"
import { Loading, MovieCard, useDebouceState } from "~/components"
import { api } from "~/utils/api"

const Home: NextPage = () => {
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebouceState(query, 500)
  const params = useMemo(
    () => (debouncedQuery ? { query: debouncedQuery } : undefined),
    [debouncedQuery]
  )

  const { data, isLoading, isFetching, error } = api.movies.get.useQuery(
    params,
    {
      refetchOnWindowFocus: false,
    }
  )

  return (
    <>
      <Head>
        <title>22/27 - TMDB Designed</title>
      </Head>
      <main
        data-theme="night"
        className="flex min-h-screen flex-col items-center gap-4"
      >
        <h1 className="m-6 text-4xl font-extrabold tracking-tight text-accent">
          22/27 - TMDB Designed
        </h1>
        <Loading loading={isLoading || isFetching} />
        <div className="mb-12 flex max-w-6xl flex-col items-center justify-center gap-12 text-accent">
          <div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text text-accent">
                  Search your favourite movie...
                </span>
              </label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value || "")}
                placeholder="The Batman..."
                className="input-bordered input-accent input w-full max-w-xs"
              />
            </div>
          </div>

          {error && (
            <div className="flex flex-col items-center">
              <div className="alert alert-error shadow-lg">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 flex-shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h3 className="font-bold">
                      Error! Something went wrong...
                    </h3>
                    <div className="text-xs">
                      message:{" "}
                      {error.message
                        ? error.message
                        : "Hmmm, Can&apos;t seem to find what went wrong...🤔"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!(
            isFetching ||
            isLoading ||
            error ||
            data.results?.length !== 0
          ) && (
            <div className="flex flex-col items-center gap-2">
              <p className="text-xl font-semibold">
                No results found for &quot;{query}&quot;
              </p>
              <p className="text-xl font-semibold">
                Please try entering a valid movie name
              </p>
            </div>
          )}
          <div>
            <div className="flex flex-col gap-8">
              {data?.results?.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
