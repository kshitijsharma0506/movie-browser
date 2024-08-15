import './globals.css'
import { FavoritesProvider } from '../context/FavoritesProvider'

export const metadata = {
  title: 'Movie Browser',
  description: 'Search and browse your favorite movies',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FavoritesProvider>
          {children}
        </FavoritesProvider>
      </body>
    </html>
  )
}