import { NextResponse } from 'next/server'
import { searchMovies } from '../../../lib/api'

/**
 * Handles the GET request for searching movies.
 * Fetches movies based on the provided query and filters.
 *
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} - A promise that resolves to a NextResponse object.
 *
 * @throws Will throw an error if the request fails or if the searchMovies function throws an error.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url)

  /**
   * @type {string} - The search query.
   */
  const query = searchParams.get('query')

  /**
   * @type {string} - The genre filter.
   */
  const genre = searchParams.get('genre')

  /**
   * @type {string} - The minimum year filter.
   */
  const yearMin = searchParams.get('yearMin')

  /**
   * @type {string} - The maximum year filter.
   */
  const yearMax = searchParams.get('yearMax')

  /**
   * @type {string} - The minimum rating filter.
   */
  const ratingMin = searchParams.get('ratingMin')

  /**
   * @type {string} - The maximum rating filter.
   */
  const ratingMax = searchParams.get('ratingMax')

  /**
   * @type {Object} - The filters object.
   * @property {string} genre - The genre filter.
   * @property {Object} yearRange - The year range filter.
   * @property {string} yearRange.min - The minimum year.
   * @property {string} yearRange.max - The maximum year.
   * @property {Object} ratingRange - The rating range filter.
   * @property {string} ratingRange.min - The minimum rating.
   * @property {string} ratingRange.max - The maximum rating.
   */
  const filters = {
    genre,
    yearRange: { min: yearMin, max: yearMax },
    ratingRange: { min: ratingMin, max: ratingMax }
  }

  try {
    /**
     * @type {Array} - The fetched movies.
     */
    const movies = await searchMovies(query, filters)
    return NextResponse.json(movies)
  } catch (error) {
    console.error('Error fetching movies:', error)
    return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 })
  }
}