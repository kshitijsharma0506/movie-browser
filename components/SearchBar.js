'use client'

import { useState } from 'react'

/**
 * A functional component that renders a search bar.
 * It captures user input and triggers a callback function when the search button is clicked or the input changes.
 *
 * @param {Object} props - The component's props.
 * @param {Function} props.onSearch - A callback function that is triggered when the search button is clicked or the input changes.
 * The function receives the current search term as a parameter.
 *
 * @returns {JSX.Element} - The rendered search bar component.
 */
function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')

  /**
   * Handles the search input change and triggers the onSearch callback function.
   *
   * @param {SyntheticEvent} e - The event object.
   */
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