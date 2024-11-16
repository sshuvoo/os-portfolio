'use client'

import { useGSAP } from '@gsap/react'
import { IconMinus, IconX } from '@tabler/icons-react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { useEffect, useRef, useState } from 'react'
import { Status } from '../folder/folders'
import { useDispatch, useSelector } from '@/app/store'
import { closeFolder, minimizeFolder } from '@/app/features/window-slice'
import { Calculator } from '../calculator'
import { useClickOutside } from '@/app/hooks/use-click-outside'
import { setActiveApp, setZIndex } from '@/app/features/settings'

export function CalculatorFrame({
  frameName,
  frame_id,
  status,
}: {
  frameName: string
  frame_id: string
  status: Status
}) {
  const timeline = useRef<gsap.core.Timeline>(gsap.timeline())
  const frame = useRef<HTMLDivElement>(null)
  const frameHeader = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  const minimizeTL = useRef<gsap.core.Timeline>(gsap.timeline())
  const { zIndex } = useSelector((state) => state.settings)
  const [isFocused, setIsFocused] = useState(true)
  const dragRef = useRef<globalThis.Draggable[]>()

  const { contextSafe } = useGSAP(() => {
    const position_x = Math.floor(Math.random() * (innerWidth - 300))
    const position_y = Math.floor(Math.random() * (innerHeight - 500))

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
      trigger: frameHeader.current,
      zIndexBoost: false,
      allowEventDefault: true,
    })
  })

  const onClose = contextSafe(() => {
    dispatch(setActiveApp(null))
    timeline.current.reverse()
    timeline.current.eventCallback('onReverseComplete', () => {
      dispatch(closeFolder(frame_id))
    })
  })

  const syncPosition = () => {
    if (dragRef.current && frame.current) {
      const rect = frame.current.getBoundingClientRect()
      const left = rect.left
      const top = rect.top
      gsap.set(frame.current, { left, top, x: 0, y: 0 })
    }
  }

  const onMinimize = contextSafe(() => {
    syncPosition()
    minimizeTL.current.to(frame.current, {
      yPercent: 100,
      scale: 0.3,
      xPercent: -50,
      left: '50%',
      duration: 0.5,
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

  const handleZIndex = () => {
    if (frame.current) {
      dispatch(setZIndex(zIndex + 1))
      frame.current.style.zIndex = `${zIndex + 1}`
    }
  }

  useClickOutside(() => {
    setIsFocused(false)
  }, frame)

  useEffect(() => {
    if (frame.current) {
      frame.current.style.zIndex = `${zIndex}`
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      onContextMenu={(e) => {
        e.stopPropagation()
      }}
      onMouseDown={() => {
        dispatch(setActiveApp({ name: frameName }))
        handleZIndex()
        setIsFocused(true)
      }}
      ref={frame}
      className={`absolute rounded-md bg-light-background shadow-2xl dark:bg-dark-foreground ${isFocused ? 'brightness-100' : 'brightness-90'} ${status === 'minimize' ? 'hidden' : ''}`}
    >
      <div className="relative h-full">
        <div ref={frameHeader} className="!cursor-custom-auto">
          <div className="group flex items-center p-3">
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
            <button className="!cursor-custom-auto p-1" type="button">
              <div className="size-3 rounded-full bg-gray-500"></div>
            </button>
          </div>
        </div>
        <div className="h-full max-h-[calc(100%-44px)] overflow-y-auto p-3 pt-0">
          <Calculator />
        </div>
      </div>
    </div>
  )
}
