'use client'

import { useEffect, useRef } from 'react'
import useInfiniteScroll from '../lib/useInfiniteScroll'

/**
 * A React component that provides infinite scrolling functionality.
 * It uses Intersection Observer API to detect when the user has scrolled to the bottom of the page.
 * When the user scrolls down, it triggers a callback function to load more data.
 *
 * @param {Object} props - The component's props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the infinite scroll container.
 * @param {Function} props.onLoadMore - A callback function that is triggered when the user scrolls to the bottom of the page.
 *
 * @returns {React.ReactElement} - The InfiniteScroll component with the specified children and loading indicator.
 */
function InfiniteScroll({ children, onLoadMore }) {
  const [isFetching, setIsFetching] = useInfiniteScroll(onLoadMore)
  const prevY = useRef(0)
  const observer = useRef(null)

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0]
        const y = firstEntry.boundingClientRect.y

        if (prevY.current > y) {
          setIsFetching(true)
        }
        prevY.current = y
      },
      { threshold: 0.5 }
    )

    const currentObserver = observer.current

    return () => currentObserver.disconnect()
  }, [setIsFetching])

  useEffect(() => {
    const currentObserver = observer.current
    if (currentObserver) {
      currentObserver.observe(document.querySelector('.infinite-scroll-trigger'))
    }

    return () => {
      if (currentObserver) {
        currentObserver.disconnect()
      }
    }
  }, [])

  return (
    <div>
      {children}
      {isFetching && <div className="text-center py-4">Loading more...</div>}
      <div className="infinite-scroll-trigger" />
    </div>
  )
}

export default InfiniteScroll