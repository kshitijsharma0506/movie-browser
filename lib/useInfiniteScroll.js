import { useState, useEffect, useCallback } from 'react'

/**
 * A custom React hook for implementing infinite scrolling.
 *
 * @function useInfiniteScroll
 * @param {Function} callback - A callback function to be executed when the user scrolls to the bottom of the page.
 * @returns {Array} An array containing two elements:
 * - isFetching: A boolean indicating whether the hook is currently fetching more data.
 * - setIsFetching: A function to set the value of isFetching.
 */
export default function useInfiniteScroll(callback) {
  const [isFetching, setIsFetching] = useState(false)

  /**
   * A callback function that handles the scroll event.
   * Sets isFetching to true when the user scrolls to the bottom of the page.
   */
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight ||
      isFetching
    )
      return
    setIsFetching(true)
  }, [isFetching])

  /**
   * Adds the scroll event listener to the window and removes it when the component unmounts.
   */
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  /**
   * Calls the callback function when isFetching becomes true.
   */
  useEffect(() => {
    if (!isFetching) return
    if (typeof callback === 'function') {
      callback()
    }
  }, [isFetching, callback])

  return [isFetching, setIsFetching]
}