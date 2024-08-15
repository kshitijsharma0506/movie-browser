'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const FavoritesContext = createContext()

/**
 * A React context provider component for managing favorite movie IDs.
 * It uses the `useState` and `useEffect` hooks to handle the state and local storage synchronization.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the provider.
 *
 * @returns {React.ReactElement} - The FavoritesProvider component with the context provider.
 *
 * @example
 * <FavoritesProvider>
 *   <App />
 * </FavoritesProvider>
 */
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  const toggleFavorite = (movieId) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.includes(movieId)
        ? prevFavorites.filter((id) => id !== movieId)
        : [...prevFavorites, movieId]
      
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  return useContext(FavoritesContext)
}