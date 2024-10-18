'use client'

import { useGSAP } from '@gsap/react'
import {
  IconArrowLeft,
  IconArrowRight,
  IconBracketsAngle,
  IconChevronLeft,
  IconChevronRight,
  IconDotsVertical,
  IconHome,
  IconLayoutBoard,
  IconListDetails,
  IconMinus,
  IconPlus,
  IconReload,
  IconX,
} from '@tabler/icons-react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { FormEvent, ReactNode, useRef, useState } from 'react'
import { Status } from '../folder/folders'
import { useDispatch, useSelector } from '@/app/store'
import { closeFolder, minimizeFolder } from '@/app/features/window-slice'
import { Size, useResize } from '@/app/hooks/use-resize'
import { setuid } from 'process'
import {
  addNewtab,
  focusTab,
  removeTab,
  resetChrome,
  updateTab,
} from '@/app/features/chrome'
const size: Size = { minW: 750, minH: 300 }

export function BrowserFrame({
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
      bounds: 'body',
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

  const [url, setUrl] = useState('')
  const [iframeUrl, setIframeUrl] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (url) {
      const formattedUrl =
        url.startsWith('http://') || url.startsWith('https://')
          ? url
          : `https://${url}`
      setIframeUrl(formattedUrl)
    }
  }

  const { focusedTab, tabs } = useSelector((state) => state.chrome)
  const activeTab = tabs.find((tab) => tab.id === focusedTab)

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
          ref={frameHeader}
          onDoubleClick={onFullScreen}
          className="grid cursor-custom-auto grid-cols-[auto,1fr] bg-[#202124] py-2 pb-1"
        >
          <div className="group flex items-center px-2">
            <button
              onClick={() => {
                onClose()
                dispatch(resetChrome())
              }}
              className="!cursor-custom-auto p-1"
              type="button"
            >
              <div className="size-3 rounded-full bg-[#FF6058]">
                <IconX className="size-full opacity-0 group-hover:opacity-100" />
              </div>
            </button>
            <button
              onClick={onMinimize}
              className="!cursor-custom-auto p-1"
              type="button"
            >
              <div className="size-3 rounded-full bg-[#FFC130]">
                <IconMinus className="size-full opacity-0 group-hover:opacity-100" />
              </div>
            </button>
            <button
              onClick={onFullScreen}
              className="!cursor-custom-auto p-1"
              type="button"
            >
              <div className="size-3 rounded-full bg-[#27CA40]">
                <IconBracketsAngle className="size-full -rotate-45 opacity-0 group-hover:opacity-100" />
              </div>
            </button>
          </div>
          <div className="flex gap-1 text-sm text-[#d3d3d3]">
            {tabs.map((tab) => (
              <button
                onClick={() => {
                  dispatch(focusTab(tab.id))
                  setUrl(tab.url)
                }}
                key={tab.id}
                className="relative flex min-w-40 items-center justify-between rounded-t-md bg-[#35363A] px-3 py-[6px]"
              >
                <span>New Tab</span>
                <IconX
                  onClick={() => {
                    dispatch(removeTab(tab.id))
                    if (tabs.length === 1) {
                      onClose()
                    }
                  }}
                  stroke={2}
                  className="size-4"
                />
                {focusedTab === tab.id && (
                  <span className="absolute -bottom-1 left-0 h-1 w-full bg-[#35363A]"></span>
                )}
              </button>
            ))}
            <button
              onClick={() => {
                dispatch(addNewtab())
                setUrl('')
              }}
              className="px-2"
              type="button"
            >
              <IconPlus stroke={2} className="size-5" />
            </button>
          </div>
        </div>
        <div className="h-full max-h-[calc(100%-40px)] overflow-y-auto bg-[#202124]">
          <div className="flex items-center gap-3 bg-[#35363A] px-2 py-1 text-white">
            <IconArrowLeft stroke={2} className="text-gray-500" />
            <IconArrowRight stroke={2} className="text-gray-500" />
            <IconReload stroke={2} />
            <IconHome stroke={2} />
            <form onSubmit={handleSubmit} className="w-full">
              <input
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value)
                  dispatch(updateTab(e.target.value))
                }}
                type="text"
                placeholder="Search"
                className="w-full rounded-2xl border-2 border-[#191919] bg-[#1d1d1d] px-3 py-1 text-sm focus:border-[#858585] focus:outline-none"
              />
              <input type="submit" hidden />
            </form>
            <IconDotsVertical stroke={2} />
          </div>
          {activeTab && (
            <iframe
              className="h-[calc(100%-40px)] w-full"
              src={activeTab.iframe_url}
            />
          )}
        </div>
      </div>
    </div>
  )
}
