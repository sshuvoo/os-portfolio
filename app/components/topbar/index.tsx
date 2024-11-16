'use client'

import notch from '@/public/assets/icons/Сhelka.svg'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { IoIosBatteryFull, IoIosMoon } from 'react-icons/io'
import { IoSearch } from 'react-icons/io5'
import { TaskbarClock } from '../taskbar/clock'
import { Weather } from '../taskbar/weather'
import { BrightnessRange } from './brightness-range'
import { ControlCenter } from './control-center'
import { connections } from './control-center-data'
import { InternetConnection } from './internet-connection'
import { SoundRange } from './sound-range'
import { useClickOutside } from '@/app/hooks/use-click-outside'
import { IconCast, IconRectangle } from '@tabler/icons-react'
import { useSelector } from '@/app/store'
import { BrandApple } from './brand-apple'

export function Topbar() {
  const [isOpenCC, setIsOpenCC] = useState(false)
  const ccRef = useRef<HTMLDivElement>(null)
  const { activeApp } = useSelector((state) => state.settings)
  const audio = useRef<HTMLAudioElement>()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audio.current = new Audio('/assets/music/pehle_bhi_main.mp3')
    }
  }, [])

  useClickOutside(() => {
    setIsOpenCC(false)
  }, ccRef)

  return (
    <div className="relative flex h-7 justify-between bg-white/15 px-4 text-sm font-medium text-black backdrop-blur dark:text-white">
      <div className="flex items-center gap-1">
        <BrandApple />
        <button className="flex h-full items-center rounded-md px-2 hover:bg-white/25">
          {activeApp ? activeApp.name : 'Finder'}
        </button>
        <button className="flex h-full items-center rounded-md px-2 hover:bg-white/25">
          File
        </button>
        <button className="flex h-full items-center rounded-md px-2 hover:bg-white/25">
          Edit
        </button>
        <button className="flex h-full items-center rounded-md px-2 hover:bg-white/25">
          View
        </button>
        <button className="flex h-full items-center rounded-md px-2 hover:bg-white/25">
          Go
        </button>
        <button className="flex h-full items-center rounded-md px-2 hover:bg-white/25">
          Window
        </button>
        <button className="flex h-full items-center rounded-md px-2 hover:bg-white/25">
          Help
        </button>
      </div>
      <div className="absolute left-1/2 top-0 -translate-x-1/2">
        <div className="relative">
          <Image alt="" src={notch} className="w-36" />
          <span className="absolute left-2/3 top-2 size-1 rounded-full bg-green-500" />
        </div>
      </div>
      <div className="flex h-full items-center gap-2">
        <div className="flex h-full items-center gap-2">
          <div className="flex h-full items-center rounded-md px-2 hover:bg-white/25">
            <IoIosBatteryFull className="text-xl" />
          </div>
          <div className="flex h-full items-center rounded-md px-2 hover:bg-white/25">
            <InternetConnection />
          </div>
          <div className="flex h-full items-center rounded-md px-2 hover:bg-white/25">
            <IoSearch className="text-base" />
          </div>
          <button
            onClick={() => void setIsOpenCC((pre) => !pre)}
            className="flex h-full items-center rounded-md px-2 hover:bg-white/25"
          >
            <ControlCenter className="size-4 fill-black dark:fill-white" />
          </button>
        </div>
        <Weather />
        <TaskbarClock />
      </div>
      {isOpenCC && (
        <div
          ref={ccRef}
          className="absolute right-2 top-9 flex w-full max-w-sm flex-col gap-4 rounded-2xl bg-white/20 p-4 text-light-text"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3 rounded-2xl bg-white/50 p-2 py-4">
              {connections.map((c) => (
                <div
                  key={c.id}
                  className="grid grid-cols-[auto,1fr] items-center gap-2"
                >
                  <div className="flex size-9 items-center justify-center rounded-full bg-[#007AFF]">
                    <c.Icon className="text-xl text-dark-text" />
                  </div>
                  <div>
                    <h2 className="font-medium">{c.label}</h2>
                    <p className="text-xs">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-rows-2 gap-4">
              <div className="flex items-center gap-2 rounded-2xl bg-white/50 p-4">
                <button className="flex size-9 items-center justify-center rounded-full bg-white/40">
                  <IoIosMoon className="text-xl" />
                </button>
                <span className="text-lg font-medium">Focus</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center rounded-2xl bg-white/50 p-2">
                  <IconRectangle stroke={2} />
                  <h2 className="text-center font-medium leading-none">
                    Stage Manager
                  </h2>
                </div>
                <div className="flex flex-col items-center rounded-2xl bg-white/50 p-2">
                  <IconCast stroke={2} />
                  <h2 className="text-center font-medium leading-none">
                    Stage Manager
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <BrightnessRange />
          <SoundRange audio={audio.current} />
        </div>
      )}
    </div>
  )
}
