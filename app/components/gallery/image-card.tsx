import { downloadPhoto } from '@/app/actions/download-photo'
import { IPhoto } from '@/app/types/unsplash.type'
import gsap from 'gsap'
import Image from 'next/image'
import { useRef } from 'react'

export function ImageCard({ photo }: { photo: IPhoto }) {
  const layerRef = useRef<HTMLDivElement>(null)

  // Animation for mouse enter
  const handleMouseEnter = () => {
    if (layerRef.current) {
      gsap.to(layerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
      })
    }
  }

  // Animation for mouse leave
  const handleMouseLeave = () => {
    if (layerRef.current) {
      gsap.to(layerRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 0.6,
        ease: 'power3.inOut',
      })
    }
  }

  const onDownload = async () => {
    try {
      const res = await downloadPhoto(photo.id)
      if (res && res.url) {
        const link = document.createElement('a')
        link.href = res.url
        link.download = photo.alt_description || 'photo'
        link.target = '_blank'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative h-fit w-fit overflow-hidden"
    >
      <Image
        alt={photo.alt_description}
        src={photo.urls.regular}
        width={400}
        height={400}
        className="mb-4"
      />
      <div
        ref={layerRef}
        className="absolute left-0 top-0 flex h-[calc(100%-16px)] w-full items-center justify-center bg-[#000000a9] opacity-0"
      >
        <button
          onClick={onDownload}
          type="button"
          className="rounded-md bg-primary px-3 py-1 text-sm font-medium text-white"
        >
          Download
        </button>
      </div>
    </div>
  )
}
