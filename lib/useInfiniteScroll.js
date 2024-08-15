import { useState, useEffect, useCallback } from 'react'

export default function useInfiniteScroll(callback) {
  const [isFetching, setIsFetching] = useState(false)

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight ||
      isFetching
    )
      return
    setIsFetching(true)
  }, [isFetching])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    if (!isFetching) return
    if (typeof callback === 'function') {
      callback()
    }
  }, [isFetching, callback])

  return [isFetching, setIsFetching]
}