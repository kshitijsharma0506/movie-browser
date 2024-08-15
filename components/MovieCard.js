import Image from 'next/image'
import { useFavorites } from '../context/FavoritesProvider'

export default function MovieCard({ movie }) {
  const { favorites, toggleFavorite } = useFavorites()
  const isFavorite = favorites.includes(movie.id)

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <div className="relative w-full h-0 pb-[150%]">
        <Image 
          src={movie.poster || '/placeholder-image.jpg'}
          alt={movie.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2">{movie.title}</h3>
        <p className="text-gray-700 text-base mb-2">{movie.releaseYear}</p>
        <button 
          onClick={() => toggleFavorite(movie.id)}
          className={`px-4 py-2 rounded ${isFavorite ? 'bg-red-500' : 'bg-blue-500'} text-white`}
        >
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  )
}