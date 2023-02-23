import { type NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { getImagePath, Loading } from "~/components"
import { api } from "~/utils/api"

const formatCurrency = (amount: number) => {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  } catch {
    return amount
  }
}

const Movie: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const {
    data: movie,
    isLoading,
    isFetching,
    error,
  } = api.movies.getById.useQuery(
    { id: Number(String(id)) },
    {
      refetchOnWindowFocus: false,
      enabled: Boolean(id),
    }
  )

  const backdropImageStyle = movie?.backdrop_path
    ? {
        background: `url(${getImagePath(
          movie?.backdrop_path
        )}) 100% 100% / cover no-repeat`,
      }
    : undefined

  return (
    <>
      <Head>
        <title>22/27 - TMDB Designed</title>
      </Head>
      <main
        data-theme="night"
        className="flex min-h-screen flex-col items-center gap-4"
        style={backdropImageStyle}
      >
        <Loading loading={isLoading || isFetching} />
        {error && (
          <div className="mt-8 flex flex-col items-center">
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
                  <h3 className="font-bold">Error! Something went wrong...</h3>
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

        {!!movie && (
          <div className="glass flex h-full min-h-screen w-full flex-col items-center gap-4 p-8 text-secondary-content">
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col items-center gap-4">
                {!!movie.title && (
                  <h1 className="glass rounded-lg px-6 py-3 text-3xl font-bold">
                    {movie.title}
                  </h1>
                )}
                {!!movie.tagline && (
                  <p className="glass rounded-lg px-4 py-2 text-lg font-semibold">
                    {movie.tagline}
                  </p>
                )}
              </div>
              <div>
                {!!movie.poster_path && (
                  <img
                    className="h-[450px] w-[300px] rounded-xl"
                    src={`${getImagePath(movie.poster_path)}`}
                    alt="Poster"
                  />
                )}
              </div>
              {!!movie?.genres?.length && (
                <div className="flex flex-col items-center gap-4">
                  <div className="flex flex-wrap gap-4">
                    {movie?.genres?.map((genre) => (
                      <span
                        key={genre.id}
                        className="glass rounded-md px-2 py-1 font-semibold"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex items-center gap-4">
                {!!movie.release_date && (
                  <p className="glass rounded-lg px-4 py-3 font-semibold">
                    {movie.release_date}
                  </p>
                )}
                {!!movie.runtime && (
                  <p className="glass rounded-lg px-4 py-3 font-semibold">
                    {movie.runtime} minutes
                  </p>
                )}
              </div>
            </div>
            <div className="flex max-w-xl flex-col items-center gap-4">
              {!!movie.overview && (
                <p className="text-md glass rounded-lg px-4 py-3 text-justify">
                  {movie.overview}
                </p>
              )}
            </div>
            <div className="flex items-center gap-4">
              {!!movie.budget && (
                <p className="glass rounded-lg px-4 py-2 font-semibold">
                  Budget: {formatCurrency(movie.budget || 0)}
                </p>
              )}
              {!!movie.revenue && (
                <p className="glass rounded-lg px-4 py-2 font-semibold">
                  Revenue: {formatCurrency(movie.revenue || 0)}
                </p>
              )}
            </div>
            {!!movie?.production_companies?.length && (
              <div className="glass flex flex-col items-center gap-4 rounded-lg p-4 font-semibold">
                <h1 className="text-2xl font-bold">Production Companies</h1>
                <div className="flex flex-wrap justify-center gap-4">
                  {movie?.production_companies?.map((company) => (
                    <span
                      key={company.id}
                      className="glass rounded-lg px-2 py-1  font-semibold"
                    >
                      {company.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </>
  )
}

export default Movie
