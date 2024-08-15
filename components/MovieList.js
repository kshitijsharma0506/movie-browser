'use client'

import MovieCard from './MovieCard'
import InfiniteScroll from './InfiniteScroll'

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