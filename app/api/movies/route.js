import { NextResponse } from 'next/server'
import { searchMovies } from '../../../lib/api'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')
  const genre = searchParams.get('genre')
  const yearMin = searchParams.get('yearMin')
  const yearMax = searchParams.get('yearMax')
  const ratingMin = searchParams.get('ratingMin')
  const ratingMax = searchParams.get('ratingMax')

  const filters = {
    genre,
    yearRange: { min: yearMin, max: yearMax },
    ratingRange: { min: ratingMin, max: ratingMax }
  }

  try {
    const movies = await searchMovies(query, filters)
    return NextResponse.json(movies)
  } catch (error) {
    console.error('Error fetching movies:', error)
    return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 })
  }
}