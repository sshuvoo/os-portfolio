import { setMusicStatus, setVolume } from '@/app/features/settings'
import { useDispatch, useSelector } from '@/app/store'
import { useEffect, useRef } from 'react'
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from 'react-icons/hi2'
import musicIcon from '@/public/assets/icons/Music.png'
import Image from 'next/image'
import { FaForward, FaPause, FaPlay } from 'react-icons/fa'

export function SoundRange({ audio }: { audio?: HTMLAudioElement }) {
  const soundThumb = useRef<HTMLButtonElement>(null)
  const soundLabel = useRef<HTMLDivElement>(null)
  const soundTrack = useRef<HTMLDivElement>(null)

  const dispatch = useDispatch()
  const { volume, music_status } = useSelector((state) => state.settings)

  useEffect(() => {
    const thumb = soundThumb.current
    const rect =
      soundTrack.current && soundTrack.current.getBoundingClientRect()

    const thumbHandler = (e: MouseEvent) => {
      if (rect) {
        const range =
          e.clientX - rect.left >= 70
            ? e.clientX - rect.left > rect.width
              ? rect.width - 2
              : e.clientX - rect.left
            : 70
        const sound = ((range - 25) / (rect.width - 27)) * 100
        dispatch(setVolume(sound))
        if (audio instanceof HTMLAudioElement) {
          audio.volume =
            sound / 100 >= 1 ? 1 : sound / 100 <= 0 ? 0 : sound / 100
        }
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
  }, [dispatch, audio])

  const handleStart = () => {
    if (audio instanceof HTMLAudioElement) {
      if (music_status === 'playing') audio.pause()
      else {
        audio.volume = volume / 100
        audio.play()
      }
    }
  }

  useEffect(() => {
    const music = audio
    const handlePlay = () => {
      dispatch(setMusicStatus('playing'))
    }
    const handlePause = () => {
      dispatch(setMusicStatus('paused'))
    }
    if (music instanceof HTMLAudioElement) {
      music.addEventListener('play', handlePlay)
      music.addEventListener('pause', handlePause)
      music.addEventListener('ended', handlePause)
    }
    return () => {
      if (music instanceof HTMLAudioElement) {
        music.removeEventListener('play', handlePlay)
        music.removeEventListener('pause', handlePause)
        music.removeEventListener('ended', handlePause)
      }
    }
  }, [dispatch, audio])

  return (
    <>
      <div className="rounded-2xl bg-white/50 p-3">
        <h2 className="mb-1 font-medium">Sound</h2>
        <div
          ref={soundTrack}
          className="relative h-6 rounded-full border border-[#6f6f6f] bg-black/20"
        >
          {volume > 0 ? (
            <HiMiniSpeakerWave className="pointer-events-none absolute left-1 top-1/2 size-5 -translate-y-1/2" />
          ) : (
            <HiMiniSpeakerXMark className="pointer-events-none absolute left-1 top-1/2 size-5 -translate-y-1/2" />
          )}
          <div
            ref={soundLabel}
            style={{ width: `${volume}%` }}
            className="box-border flex h-full justify-end rounded-full bg-white"
          >
            <button
              ref={soundThumb}
              className="size-[22px] rounded-full border border-[#d2d2d2]"
            ></button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between rounded-2xl bg-white/50 p-3">
        <div className="flex items-center gap-2">
          <div className="flex size-12 items-center justify-center rounded-md bg-black/20">
            <Image alt="" src={musicIcon} width={30} height={30} />
          </div>
          <h2 className="font-medium">
            {music_status === 'playing' ? 'Pehli Bhi Main' : 'Music'}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleStart}>
            {music_status === 'playing' ? <FaPause /> : <FaPlay />}
          </button>
          <FaForward className="text-[#484848]" />
        </div>
      </div>
    </>
  )
}
