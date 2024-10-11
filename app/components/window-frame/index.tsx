'use client'

import { useGSAP } from '@gsap/react'
import {
  IconBracketsAngle,
  IconChevronLeft,
  IconChevronRight,
  IconLayoutBoard,
  IconListDetails,
  IconMinus,
  IconX,
} from '@tabler/icons-react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { ReactNode, useRef } from 'react'
import { Status } from '../folder/folders'

export function WindowFrame({
  children,
  onClose,
  onMinimize,
  onFullScreen,
  frameName,
  status,
}: {
  children: ReactNode
  frameName: string
  onClose: () => void
  onMinimize: () => void
  onFullScreen: () => void
  status: Status
}) {
  const timeline = useRef<gsap.core.Timeline>(gsap.timeline())
  const frame = useRef<HTMLDivElement>(null)
  const frameHeader = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    timeline.current.fromTo(
      frame.current,
      {
        y: '100vh',
        xPercent: -50,
        left: '50%',
        position: 'absolute',
        opacity: 0,
        ease: 'back.inOut',
      },
      {
        y: '-50%',
        top: '50%',
        opacity: 1,
        ease: 'back.inOut',
      }
    )
    timeline.current.fromTo(
      frame.current,
      { scale: 0.5, ease: 'back.inOut' },
      {
        scale: 1,
        ease: 'back.inOut',
      }
    )
    Draggable.create(frame.current, {
      bounds: 'body',
      trigger: frameHeader.current,
    })
  })

  return (
    <div
      ref={frame}
      className={`h-3/4 w-9/12 bg-white/20 shadow-xl backdrop-blur-md ${status === 'minimize' ? 'hidden' : ''}`}
    >
      <div className="grid grid-cols-[250px,1fr]">
        <div className="group flex items-center bg-[#282828] p-3">
          <button
            onClick={onClose}
            className="!cursor-custom-auto p-1"
            type="button"
          >
            <div className="size-3 rounded-full bg-rose-500">
              <IconX className="size-full opacity-0 group-hover:opacity-100" />
            </div>
          </button>
          <button
            onClick={onMinimize}
            className="!cursor-custom-auto p-1"
            type="button"
          >
            <div className="size-3 rounded-full bg-yellow-500">
              <IconMinus className="size-full opacity-0 group-hover:opacity-100" />
            </div>
          </button>
          <button
            onClick={onFullScreen}
            className="!cursor-custom-auto p-1"
            type="button"
          >
            <div className="size-3 rounded-full bg-green-500">
              <IconBracketsAngle className="size-full -rotate-45 opacity-0 group-hover:opacity-100" />
            </div>
          </button>
        </div>
        <div className="grid grid-cols-[1fr,auto] items-center justify-between bg-[#212121] px-4 text-[#d0d0d0]">
          <div
            ref={frameHeader}
            className="flex !cursor-custom-pointer items-center gap-2 text-[#8d8d8d]"
          >
            <div className="flex items-center">
              <button>
                <IconChevronLeft stroke={2} />
              </button>
              <button>
                <IconChevronRight stroke={2} />
              </button>
            </div>
            <h3 className="font-semibold text-[#dedede]">{frameName}</h3>
          </div>
          <div className="flex items-center gap-2 text-[#8d8d8d]">
            <button>
              <IconListDetails stroke={2} />
            </button>
            <button>
              <IconLayoutBoard stroke={2} />
            </button>
            <input
              type="text"
              placeholder="Search"
              className="rounded-2xl border-2 border-[#191919] bg-[#353535] px-3 py-1 text-sm focus:border-[#858585] focus:outline-none"
            />
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}
