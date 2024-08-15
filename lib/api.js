// import { env } from 'process';

const API_KEY = '0a2b013027644986140d03829b906940';
const BASE_URL = 'https://api.themoviedb.org/3';

/**
 * Fetches a list of movies based on the provided search query and filters.
 *
 * @param {string} query - The search query string.
 * @param {Object} filters - An object containing filter criteria.
 * @param {string} [filters.genre] - The movie genre ID.
 * @param {Object} [filters.yearRange] - An object with 'min' and 'max' properties representing the release year range.
 * @param {number} [filters.yearRange.min] - The minimum release year.
 * @param {number} [filters.yearRange.max] - The maximum release year.
 * @param {Object} [filters.ratingRange] - An object with 'min' and 'max' properties representing the rating range.
 * @param {number} [filters.ratingRange.min] - The minimum rating.
 * @param {number} [filters.ratingRange.max] - The maximum rating.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of movie objects. Each movie object has the following properties:
 * - id: The movie ID.
 * - title: The movie title.
 * - poster: The movie poster URL or null if no poster is available.
 * - releaseYear: The movie release year or null if no release date is available.
 * - rating: The movie rating.
 *
 * @throws {Error} If an error occurs during the fetch operation.
 */
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