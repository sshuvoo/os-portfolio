'use client'

import { useEffect, useRef, useState } from 'react'
import { Size, useResize } from '../hooks/use-resize'
const s: Size = { minW: 300, maxW: 600, maxH: 450 }

const ResizableDiv = () => {
  const frame = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  const r = useResize({ frame, place: 'r', size: s })
  const l = useResize({ frame, place: 'l', size: s })
  const b = useResize({ frame, place: 'b', size: s })
  const t = useResize({ frame, place: 't', size: s })
  const tl = useResize({ frame, place: 'tl', size: s })
  const tr = useResize({ frame, place: 'tr', size: s })
  const bl = useResize({ frame, place: 'bl', size: s })
  const br = useResize({ frame, place: 'br', size: s })

  useEffect(() => {
    const divRef = frame
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setSize({ width, height })
      }
    })

    if (divRef.current) {
      resizeObserver.observe(divRef.current)
    }

    // Cleanup the observer when the component unmounts
    return () => {
      if (divRef.current) {
        resizeObserver.unobserve(divRef.current)
      }
    }
  }, [])

  return (
    <div className="ml-96 mt-72 h-screen">
      <div ref={frame} className="absolute size-96">
        <div className="relative size-full">
          <div className="absolute size-full place-content-center text-4xl text-white">
            {size.width}x{size.height}px
          </div>
          <div
            ref={t}
            className="absolute top-0 z-10 h-1 w-full cursor-ns-resize bg-red-500"
          />
          <div
            ref={b}
            className="absolute bottom-0 z-10 h-1 w-full cursor-ns-resize bg-red-500"
          />
          <div
            ref={r}
            className="absolute right-0 z-10 h-full w-1 cursor-ew-resize bg-red-500"
          />
          <div
            ref={l}
            className="absolute left-0 z-10 h-full w-1 cursor-ew-resize bg-red-500"
          />
          <div
            ref={tl}
            className="absolute left-0 top-0 z-20 size-2 cursor-nwse-resize bg-white"
          />
          <div
            ref={tr}
            className="absolute right-0 top-0 z-20 size-2 cursor-nesw-resize bg-white"
          />
          <div
            ref={bl}
            className="absolute bottom-0 left-0 z-20 size-2 cursor-nesw-resize bg-white"
          />
          <div
            ref={br}
            className="absolute bottom-0 right-0 z-20 size-2 cursor-nwse-resize bg-white"
          />
        </div>
      </div>
    </div>
  )
}

export default ResizableDiv
