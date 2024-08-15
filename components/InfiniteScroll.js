'use client'

import { useEffect, useRef } from 'react'
import useInfiniteScroll from '../lib/useInfiniteScroll'

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