'use client'

import { useGSAP } from '@gsap/react'
import { IconMinus, IconX } from '@tabler/icons-react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { useRef } from 'react'
import { Status } from '../folder/folders'
import { useDispatch } from '@/app/store'
import { closeFolder, minimizeFolder } from '@/app/features/window-slice'
import { Calculator } from '../calculator'

export function CalculatorFrame({
  frame_id,
  status,
}: {
  frame_id: string
  status: Status
}) {
  const timeline = useRef<gsap.core.Timeline>(gsap.timeline())
  const frame = useRef<HTMLDivElement>(null)
  const frameHeader = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  const minimizeTL = useRef<gsap.core.Timeline>(gsap.timeline())

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

  return (
    <div
      ref={frame}
      className={`absolute rounded-lg bg-[#282828] shadow-xl ${status === 'minimize' ? 'hidden' : ''}`}
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