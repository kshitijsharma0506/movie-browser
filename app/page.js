'use client'

import { useState, useEffect } from 'react'
import MovieList from '../components/MovieList'
import SearchBar from '../components/SearchBar'
import Filters from '../components/Filters'
import { searchMovies } from '../lib/api'

export default function Home() {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({})

  useEffect(() => {
    const fetchMovies = async () => {
      const results = await searchMovies(searchTerm, filters)
      setMovies(results)
    }

    fetchMovies()
  }, [searchTerm, filters])

  return (
    <main className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">Movie Browser</h1>
      <SearchBar onSearch={setSearchTerm} />
      <Filters onFilterChange={setFilters} />
      <MovieList initialMovies={movies} searchTerm={searchTerm} filters={filters} />
    </main>
  )
}