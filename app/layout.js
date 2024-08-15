import './globals.css'
import { FavoritesProvider } from '../context/FavoritesProvider'

export const metadata = {
  title: 'Movie Browser',
  description: 'Search and browse your favorite movies',
}

/**
 * This function is the root layout component for the Movie Browser application.
 * It wraps the application's content with the necessary HTML structure and provides
 * the FavoritesProvider context for managing favorite movies.
 *
 * @param {Object} props - The component's props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 *
 * @returns {React.ReactElement} - The root layout component with the HTML structure and FavoritesProvider.
 */
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