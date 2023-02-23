import Link from "next/link"
import type { SearchMoviesResultSuccess } from "~/types"

type MovieCardProps = {
  movie: SearchMoviesResultSuccess
}

export const getImagePath = (path: string) => {
  return `https://image.tmdb.org/t/p/w500${path}`
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div
      className="rounded-box"
      style={
        movie?.backdrop_path
          ? {
              background: `no-repeat url(${getImagePath(
                movie?.backdrop_path
              )}) 100% 100% / cover`,
            }
          : undefined
      }
    >
      <div className="card-glass-bg-opacity card glass card-side overflow-hidden shadow-xl">
        {movie?.poster_path && (
          <img
            className="h-[450px] w-[300px] object-cover"
            src={getImagePath(movie?.poster_path)}
            alt="Movie"
          />
        )}
        <div className="card-glass-content-opacity card-body gap-4 text-secondary-content">
          <h4 className=" glass card-title w-fit rounded-xl p-4">
            {movie?.adult && (
              <div className="badge badge-error min-w-fit">18+ Adult</div>
            )}
            {movie?.title}{" "}
          </h4>
          {movie?.release_date && (
            <p className="test-4xl glass max-h-fit w-fit flex-none rounded-xl p-4">
              Release Date:
              <span className="font-bold"> {movie?.release_date}</span>
            </p>
          )}
          {movie?.overview && (
            <p className="glass flex-none rounded-xl p-4">{movie?.overview}</p>
          )}
          <div className="card-actions mt-auto justify-end">
            <Link href={`/movie/${movie.id}`} className="btn-accent btn">
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
