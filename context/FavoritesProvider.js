'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const FavoritesContext = createContext()

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