'use client'

import { useState } from 'react'

/**
 * A functional component that renders a set of filters for a movie listing.
 * It manages the state of genre, year range, and rating range and triggers a callback function when filters are applied.
 *
 * @param {Object} props - The component's props.
 * @param {Function} props.onFilterChange - A callback function that is triggered when filters are applied.
 * It receives an object containing the current genre, year range, and rating range.
 *
 * @returns {JSX.Element} - The JSX element representing the Filters component.
 */
function Filters({ onFilterChange }) {
  const [genre, setGenre] = useState('')
  const [yearRange, setYearRange] = useState({ min: '', max: '' })
  const [ratingRange, setRatingRange] = useState({ min: '', max: '' })

  const handleFilterChange = () => {
    onFilterChange({
      genre,
      yearRange,
      ratingRange,
    })
  }

  return (
    <div className="space-y-4">
      <select 
        value={genre} 
        onChange={(e) => setGenre(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg"
      >
        <option value="">All Genres</option>
        {/* Add genre options */}
      </select>
      <div className="flex space-x-2">
        <input
          type="number"
          placeholder="Min Year"
          value={yearRange.min}
          onChange={(e) => setYearRange({ ...yearRange, min: e.target.value })}
          className="w-1/2 px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Max Year"
          value={yearRange.max}
          onChange={(e) => setYearRange({ ...yearRange, max: e.target.value })}
          className="w-1/2 px-4 py-2 border rounded-lg"
        />
      </div>
      <div className="flex space-x-2">
        <input
          type="number"
          placeholder="Min Rating"
          value={ratingRange.min}
          onChange={(e) => setRatingRange({ ...ratingRange, min: e.target.value })}
          className="w-1/2 px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Max Rating"
          value={ratingRange.max}
          onChange={(e) => setRatingRange({ ...ratingRange, max: e.target.value })}
          className="w-1/2 px-4 py-2 border rounded-lg"
        />
      </div>
      <button 
        onClick={handleFilterChange}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Apply Filters
      </button>
    </div>
  )
}

export default Filters