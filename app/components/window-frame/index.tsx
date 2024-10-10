'use client'

import { useGSAP } from '@gsap/react'
import { IconBracketsAngle, IconMinus, IconX } from '@tabler/icons-react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { ReactNode, useRef, useState } from 'react'

export function WindowFrame({
  children,
  onClose,
  onMinimize,
  onFullScreen,
}: {
  children: ReactNode
  onClose: () => void
  onMinimize: () => void
  onFullScreen: () => void
}) {
  const timeline = useRef<gsap.core.Timeline>()
  const frame = useRef<HTMLDivElement>(null)
  const frameHeader = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    timeline.current = gsap.timeline({
      onReverseComplete: () => {
        // setOpenProject(false)
      },
    })
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
    <div ref={frame} className={`h-5/6 w-10/12 bg-white/20 backdrop-blur-md`}>
      <div
        ref={frameHeader}
        className="!cursor-custom-pointer group flex items-center gap-2 bg-[#262626] p-3"
      >
        <button
          onClick={onClose}
          className="!cursor-custom-auto px-[2px]"
          type="button"
        >
          <div className="size-3 rounded-full bg-rose-500">
            <IconX className="size-full opacity-0 group-hover:opacity-100" />
          </div>
        </button>
        <button
          onClick={onMinimize}
          className="!cursor-custom-auto px-[2px]"
          type="button"
        >
          <div className="size-3 rounded-full bg-yellow-500">
            <IconMinus className="size-full opacity-0 group-hover:opacity-100" />
          </div>
        </button>
        <button
          onClick={onFullScreen}
          className="!cursor-custom-auto px-[2px]"
          type="button"
        >
          <div className="size-3 rounded-full bg-green-500">
            <IconBracketsAngle className="size-full -rotate-45 opacity-0 group-hover:opacity-100" />
          </div>
        </button>
      </div>
      {children}
    </div>
  )
}
