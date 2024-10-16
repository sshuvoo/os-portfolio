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
import { ReactNode, useRef, useState } from 'react'
import { Status } from '../folder/folders'
import { useDispatch } from '@/app/store'
import { closeFolder, minimizeFolder } from '@/app/features/window-slice'
import { Size, useResize } from '@/app/hooks/use-resize'
const size: Size = { minW: 750, minH: 300 }

export function WindowFrame({
  children,
  frameName,
  frame_id,
  status,
}: {
  children: ReactNode
  frameName: string
  frame_id: string
  status: Status
}) {
  const timeline = useRef<gsap.core.Timeline>(gsap.timeline())
  const frame = useRef<HTMLDivElement>(null)
  const frameHeader = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  const minimizeTL = useRef<gsap.core.Timeline>(gsap.timeline())
  const fullscreenTL = useRef<gsap.core.Timeline>(gsap.timeline())
  const [isFullscreen, setIsFullscreen] = useState(false)

  const { contextSafe } = useGSAP(() => {
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
      // bounds: 'body',
      trigger: frameHeader.current,
    })
  })

  const onClose = contextSafe(() => {
    timeline.current.reverse()
    timeline.current.eventCallback('onReverseComplete', () => {
      dispatch(closeFolder(frame_id))
    })
  })

  const onMinimize = contextSafe(() => {
    minimizeTL.current.to(frame.current, {
      yPercent: 100,
      scale: 0.3,
      xPercent: -50,
      left: '50%',
      ease: 'expo.in',
    })
    minimizeTL.current.eventCallback('onComplete', () => {
      dispatch(
        minimizeFolder({
          id: frame_id,
          onRestore: () => {
            minimizeTL.current.reverse()
            minimizeTL.current.eventCallback('onReverseComplete', () => {
              minimizeTL.current = gsap.timeline()
            })
          },
        })
      )
    })
  })

  const onFullScreen = contextSafe(() => {
    if (frame.current instanceof HTMLDivElement) {
      if (isFullscreen) {
        fullscreenTL.current.reverse()
        fullscreenTL.current.eventCallback('onReverseComplete', () => {
          fullscreenTL.current = gsap.timeline()
        })
        setIsFullscreen(false)
      } else {
        fullscreenTL.current.to(frame.current, {
          width: '100vw',
          height: '100vh',
          top: 0,
          left: '50%',
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'expo.inOut',
        })
        setIsFullscreen(true)
      }
    }
  })

  const r = useResize({ frame, place: 'r', size })
  const b = useResize({ frame, place: 'b', size })
  const br = useResize({ frame, place: 'br', size })

  return (
    <div
      ref={frame}
      className={`absolute h-1/2 min-h-[300px] w-2/4 min-w-[750px] bg-white/20 shadow-xl backdrop-blur-xl ${status === 'minimize' ? 'hidden' : ''}`}
    >
      <div className="relative h-full">
        {/* <div
          ref={t}
          className="absolute top-0 z-10 h-1 w-full cursor-ns-resize bg-transparent"
        /> */}
        <div
          ref={b}
          className="absolute bottom-0 z-10 h-1 w-full cursor-ns-resize bg-transparent"
        />
        <div
          ref={r}
          className="absolute right-0 z-10 h-full w-1 cursor-ew-resize bg-transparent"
        />
        {/* <div
          ref={l}
          className="absolute left-0 z-10 h-full w-1 cursor-ew-resize bg-transparent"
        /> */}
        {/* <div
          ref={tl}
          className="absolute left-0 top-0 z-20 size-2 cursor-nwse-resize bg-transparent"
        /> */}
        {/* <div
          ref={tr}
          className="absolute right-0 top-0 z-20 size-2 cursor-nesw-resize bg-transparent"
        /> */}
        {/* <div
          ref={bl}
          className="absolute bottom-0 left-0 z-20 size-2 cursor-nesw-resize bg-transparent"
        /> */}
        <div
          ref={br}
          className="absolute bottom-0 right-0 z-20 size-2 cursor-nwse-resize bg-transparent"
        />

        <div
          onDoubleClick={onFullScreen}
          className="grid grid-cols-[250px,1fr]"
        >
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
        <div className="h-full max-h-[calc(100%-44px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
