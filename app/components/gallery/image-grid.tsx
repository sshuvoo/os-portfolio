import { getPhotos } from '@/app/actions/get-photos'
import { searchPhotos } from '@/app/actions/search-photos'
import { IPhoto } from '@/app/types/unsplash.type'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export function ImageGrid({ query }: { query: string }) {
  const [photos, setPhotos] = useState<IPhoto[]>([])
  const [windowSize, setWindowSize] = useState<number | null>(null)
  const windowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ignore = false
    async function startFetching() {
      try {
        if (query.length >= 3) {
          const photos = await searchPhotos(query)
          if (!ignore) setPhotos(photos?.results || [])
        } else {
          const photos = await getPhotos()
          if (!ignore) setPhotos(photos || [])
        }
      } catch (error) {
        console.log(error)
      }
    }
    startFetching()
    return () => {
      ignore = true
    }
  }, [query])

  useEffect(() => {
    const windowDom = windowRef.current

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        const rect = entry.contentRect
        setWindowSize(rect.width)
      }
    }

    const resizeObserver = new ResizeObserver(handleResize)

    if (windowDom) {
      resizeObserver.observe(windowDom)
    }

    return () => {
      if (windowDom) {
        resizeObserver.unobserve(windowDom)
      }
    }
  }, [])

  return (
    <div
      ref={windowRef}
      className={
        windowSize && windowSize >= 1280
          ? 'columns-5 gap-4'
          : windowSize && windowSize >= 1024
            ? 'columns-4 gap-4'
            : windowSize && windowSize >= 768
              ? 'columns-3 gap-4'
              : 'columns-2 gap-4'
      }
    >
      {photos.map((photo) => (
        <Image
          key={photo.id}
          alt={photo.alt_description}
          src={photo.urls.regular}
          width={400}
          height={400}
          className="mb-4"
        />
      ))}
    </div>
  )
}
