'use client'

import MovieCard from './MovieCard'
import InfiniteScroll from './InfiniteScroll'

/**
 * A functional component that renders a list of movie cards using the InfiniteScroll component.
 *
 * @function MovieList
 * @param {Object} props - The component's props.
 * @param {Array} props.initialMovies - An array of movie objects to be displayed initially.
 * @returns {JSX.Element} - A JSX element representing the movie list.
 */
function MovieList({ initialMovies }) {
  return (
    <InfiniteScroll>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {initialMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </InfiniteScroll>
  )
}

export default MovieList