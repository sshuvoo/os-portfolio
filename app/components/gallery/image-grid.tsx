import { getPhotos } from '@/app/actions/get-photos'
import { searchPhotos } from '@/app/actions/search-photos'
import { IPhoto } from '@/app/types/unsplash.type'
import { useEffect, useRef, useState } from 'react'
import { ImageCard } from './image-card'
import { IconPhoto } from '@tabler/icons-react'

export function ImageGrid({ query }: { query: string }) {
  const [photos, setPhotos] = useState<IPhoto[]>([])
  const [windowSize, setWindowSize] = useState<number | null>(null)
  const windowRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'pending' | 'success' | 'error'>(
    'pending'
  )

  useEffect(() => {
    let ignore = false
    setStatus('pending')
    async function startFetching() {
      try {
        if (query.length >= 2) {
          const photos = await searchPhotos(query)
          if (!ignore) setPhotos(photos?.results || [])
        } else {
          const photos = await getPhotos()
          console.log(photos)
          if (!ignore) setPhotos(photos || [])
        }
        setStatus('success')
      } catch (error) {
        setStatus('error')
        console.log(error)
      }
    }
    startFetching()
    return () => {
      setStatus('pending')
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
      {status === 'pending' &&
        Array(20)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              className="mb-4 flex h-44 animate-pulse items-center justify-center bg-[#d8d8d8] dark:bg-[#4e4e4e] rounded-md"
            >
              <IconPhoto
                stroke={1}
                className="size-20 stroke-[#9b9b9b] dark:stroke-[#272727]"
              />
            </div>
          ))}
      {status === 'success' &&
        photos.map((photo) => <ImageCard key={photo.id} photo={photo} />)}
    </div>
  )
}
