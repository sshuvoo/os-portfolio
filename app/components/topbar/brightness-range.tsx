import { setBrightness } from '@/app/features/settings'
import { useDispatch, useSelector } from '@/app/store'
import { IconSun } from '@tabler/icons-react'
import { useEffect, useRef } from 'react'

export function BrightnessRange() {
  const brightnessThumb = useRef<HTMLButtonElement>(null)
  const brightnessTrack = useRef<HTMLDivElement>(null)
  const brightnessParentTrack = useRef<HTMLDivElement>(null)
  const dbrightness = useSelector((state) => state.settings.brightness)
  const dispatch = useDispatch()

  useEffect(() => {
    const thumb = brightnessThumb.current
    const rect =
      brightnessParentTrack.current && brightnessParentTrack.current.getBoundingClientRect()

    const thumbHandler = (e: MouseEvent) => {
      if (rect) {
        const range =
          e.clientX - rect.left >= 70
            ? e.clientX - rect.left > rect.width
              ? rect.width - 2
              : e.clientX - rect.left
            : 70
        const brightness = ((range - 25) / (rect.width - 27)) * 100
        dispatch(setBrightness(brightness))
        document.body.style.filter = `brightness(${brightness}%)`
      }
    }

    const activeMouseMove = () => {
      if (thumb) {
        window.addEventListener('mousemove', thumbHandler)
      }
    }
    const deactiveMouseMove = () => {
      if (thumb) {
        window.removeEventListener('mousemove', thumbHandler)
      }
    }

    if (thumb) {
      thumb.addEventListener('mousedown', activeMouseMove)
      window.addEventListener('mouseup', deactiveMouseMove)
    }
    return () => {
      if (thumb) {
        window.removeEventListener('mousemove', thumbHandler)
        thumb.removeEventListener('mousedown', activeMouseMove)
        window.removeEventListener('mouseup', deactiveMouseMove)
      }
    }
  }, [dispatch])

  return (
    <div className="rounded-2xl bg-white/50 p-3">
      <h2 className="mb-1 font-medium">Display</h2>
      <div
        ref={brightnessParentTrack}
        className="relative h-6 rounded-full border border-[#6f6f6f] bg-black/20"
      >
        <IconSun
          stroke={2}
          className="pointer-events-none absolute left-1 top-1/2 size-5 -translate-y-1/2"
        />
        <div
          ref={brightnessTrack}
          style={{ width: `${dbrightness}%` }}
          className="box-border flex h-full justify-end rounded-full bg-white"
        >
          <button
            ref={brightnessThumb}
            className="size-[22px] rounded-full border border-[#d2d2d2]"
          ></button>
        </div>
      </div>
    </div>
  )
}
