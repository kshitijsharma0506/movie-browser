'use client'

import { useState } from 'react'

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    onSearch(e.target.value)
  }

  return (
    <input
      type="text"
      placeholder="Search movies..."
      value={searchTerm}
      onChange={handleSearch}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  )
}

export default SearchBar