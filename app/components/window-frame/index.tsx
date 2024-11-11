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
  const dragRef = useRef<globalThis.Draggable[]>()

  const { contextSafe } = useGSAP(() => {
    const position_x = Math.floor(
      Math.random() * (innerWidth - innerWidth / 2 - 50)
    )
    const position_y = Math.floor(
      Math.random() * (innerHeight - innerHeight / 2 - 80)
    )

    timeline.current.fromTo(
      frame.current,
      {
        left: `${position_x}px`,
        top: `${position_y}px`,
        opacity: 0,
        scale: 0.8,
        ease: 'back.inOut(1.7)',
        duration: 0.5,
      },
      {
        scale: 1,
        opacity: 1,
        ease: 'back.inOut(1.7)',
      }
    )
    dragRef.current = Draggable.create(frame.current, {
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
          if (dragRef.current) {
            dragRef.current[0].enable()
          }
        })
        setIsFullscreen(false)
      } else {
        fullscreenTL.current.to(frame.current, {
          width: '100vw',
          height: `${innerHeight - 28}px`,
          x: 0,
          y: 0,
          left: '0px',
          top: '28px',
          duration: 0.5,
          ease: 'expo.inOut',
        })
        if (dragRef.current) {
          dragRef.current[0].kill()
        }
        setIsFullscreen(true)
      }
    }
  })

  const r = useResize({ frame, place: 'r', size })
  const b = useResize({ frame, place: 'b', size })
  const br = useResize({ frame, place: 'br', size })

  return (
    <div
      onContextMenu={(e) => {
        e.stopPropagation()
      }}
      ref={frame}
      className={`absolute h-1/2 min-h-[300px] w-2/4 min-w-[750px] overflow-hidden rounded-md bg-white/20 shadow-2xl backdrop-blur-xl ${status === 'minimize' ? 'hidden' : ''}`}
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
          ref={frameHeader}
          onDoubleClick={onFullScreen}
          className="grid grid-cols-[250px,1fr] !cursor-custom-auto"
        >
          <div className="dark:bg-dark-foreground bg-light-foreground group flex items-center p-3">
            <button
              onClick={onClose}
              className="!cursor-custom-auto p-1"
              type="button"
            >
              <div className="size-3 rounded-full bg-rose-500">
                <IconX className="size-full text-black opacity-0 group-hover:opacity-100" />
              </div>
            </button>
            <button
              onClick={onMinimize}
              className="!cursor-custom-auto p-1"
              type="button"
            >
              <div className="size-3 rounded-full bg-yellow-500">
                <IconMinus className="size-full text-black opacity-0 group-hover:opacity-100" />
              </div>
            </button>
            <button
              onClick={onFullScreen}
              className="!cursor-custom-auto p-1"
              type="button"
            >
              <div className="size-3 rounded-full bg-green-500">
                <IconBracketsAngle className="size-full -rotate-45 text-black opacity-0 group-hover:opacity-100" />
              </div>
            </button>
          </div>
          <div className="dark:text-dark-text text-light-text dark:bg-dark-background bg-light-background grid grid-cols-[1fr,auto] items-center justify-between px-4">
            <div className="dark:text-light-primary flex !cursor-custom-auto items-center gap-2 text-dark-primary">
              <div className="flex items-center">
                <button>
                  <IconChevronLeft stroke={2} />
                </button>
                <button>
                  <IconChevronRight stroke={2} />
                </button>
              </div>
              <h3 className="font-semibold">{frameName}</h3>
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
                className="dark:bg-dark-input-bg bg-light-input-bg dark:border-dark-border border-light-border rounded-2xl border-2 px-3 py-1 text-sm focus:border-[#858585] focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text h-full max-h-[calc(100%-44px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
