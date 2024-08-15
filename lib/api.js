// import { env } from 'process';

const API_KEY = '0a2b013027644986140d03829b906940';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function searchMovies(query, filters) {
  const url = new URL(`${BASE_URL}/search/movie`);
  url.searchParams.append('api_key', API_KEY);
  url.searchParams.append('query', query);

  if (filters.genre) url.searchParams.append('with_genres', filters.genre);
  if (filters.yearRange?.min) url.searchParams.append('primary_release_date.gte', `${filters.yearRange.min}-01-01`);
  if (filters.yearRange?.max) url.searchParams.append('primary_release_date.lte', `${filters.yearRange.max}-12-31`);
  if (filters.ratingRange?.min) url.searchParams.append('vote_average.gte', filters.ratingRange.min);
  if (filters.ratingRange?.max) url.searchParams.append('vote_average.lte', filters.ratingRange.max);

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);

    return data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
      releaseYear: movie.release_date ? new Date(movie.release_date).getFullYear() : null,
      rating: movie.vote_average
    }));
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}