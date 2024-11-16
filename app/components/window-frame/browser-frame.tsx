'use client'

import {
  addNewtab,
  focusTab,
  removeTab,
  resetChrome,
  updateTab,
} from '@/app/features/chrome'
import { closeFolder, minimizeFolder } from '@/app/features/window-slice'
import { Size, useResize } from '@/app/hooks/use-resize'
import { useDispatch, useSelector } from '@/app/store'
import { useGSAP } from '@gsap/react'
import {
  IconArrowLeft,
  IconArrowRight,
  IconBracketsAngle,
  IconChevronRight,
  IconDotsVertical,
  IconHome,
  IconMinus,
  IconPlus,
  IconReload,
  IconX,
} from '@tabler/icons-react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { Status } from '../folder/folders'
import Image from 'next/image'
import googleIcon from '@/public/assets/icons/google_logo.svg'
import { useTheme } from 'next-themes'
import { setActiveApp, setZIndex } from '@/app/features/settings'
import { useClickOutside } from '@/app/hooks/use-click-outside'

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
  const dragRef = useRef<globalThis.Draggable[]>()
  const { zIndex } = useSelector((state) => state.settings)
  const [isFocused, setIsFocused] = useState(true)
  const { theme } = useTheme()

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
      zIndexBoost: false,
      allowEventDefault: true,
    })
  })

  const onDragEnable = () => {
    if (dragRef.current) {
      dragRef.current[0].enable()
    }
  }

  const syncPosition = () => {
    if (dragRef.current && frame.current) {
      const rect = frame.current.getBoundingClientRect()
      const left = rect.left
      const top = rect.top
      gsap.set(frame.current, { left, top, x: 0, y: 0 })
    }
  }

  const onDragDisable = () => {
    if (dragRef.current) {
      syncPosition()
      dragRef.current[0].kill()
    }
  }

  const handleZIndex = () => {
    if (frame.current) {
      dispatch(setZIndex(zIndex + 1))
      frame.current.style.zIndex = `${zIndex + 1}`
    }
  }

  const onClose = contextSafe(() => {
    dispatch(setActiveApp(null))
    timeline.current.reverse()
    timeline.current.eventCallback('onReverseComplete', () => {
      dispatch(closeFolder(frame_id))
    })
  })

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

  const onLeftScreen = contextSafe(() => {
    setIsFullscreen(false)
    if (frame.current instanceof HTMLDivElement) {
      fullscreenTL.current.clear()
      gsap.to(frame.current, {
        width: '50vw',
        height: `${innerHeight - 28}px`,
        x: 0,
        y: 0,
        left: '0px',
        top: '28px',
        duration: 0.5,
        ease: 'expo.inOut',
      })
    }
  })

  const onRightScreen = contextSafe(() => {
    setIsFullscreen(false)
    if (frame.current instanceof HTMLDivElement) {
      fullscreenTL.current.clear()
      gsap.to(frame.current, {
        width: '50vw',
        height: `${innerHeight - 28}px`,
        x: 0,
        y: 0,
        left: '50%',
        top: '28px',
        duration: 0.5,
        ease: 'expo.inOut',
      })
    }
  })

  const onTopScreen = contextSafe(() => {
    setIsFullscreen(false)
    if (frame.current instanceof HTMLDivElement) {
      fullscreenTL.current.clear()
      gsap.to(frame.current, {
        width: '100vw',
        height: `${(innerHeight - 28) / 2}px`,
        x: 0,
        y: 0,
        left: '0px',
        top: '28px',
        duration: 0.5,
        ease: 'expo.inOut',
      })
    }
  })

  const onBottomScreen = contextSafe(() => {
    setIsFullscreen(false)
    if (frame.current instanceof HTMLDivElement) {
      fullscreenTL.current.clear()
      gsap.to(frame.current, {
        width: '100vw',
        height: `${(innerHeight - 28) / 2}px`,
        x: 0,
        y: 0,
        left: '0px',
        top: `${(innerHeight - 28) / 2 + 28}px`,
        duration: 0.5,
        ease: 'expo.inOut',
      })
    }
  })

  const t = useResize({ frame, place: 't', size, onDragEnable, onDragDisable })
  const tr = useResize({
    frame,
    place: 'tr',
    size,
    onDragEnable,
    onDragDisable,
  })
  const tl = useResize({
    frame,
    place: 'tl',
    size,
    onDragEnable,
    onDragDisable,
  })
  const r = useResize({ frame, place: 'r', size })
  const l = useResize({ frame, place: 'l', size, onDragEnable, onDragDisable })
  const bl = useResize({
    frame,
    place: 'bl',
    size,
    onDragEnable,
    onDragDisable,
  })
  const b = useResize({ frame, place: 'b', size })
  const br = useResize({ frame, place: 'br', size })

  const [url, setUrl] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (url) {
      const formattedUrl =
        url.startsWith('http://') || url.startsWith('https://')
          ? url
          : `https://${url}`
      dispatch(updateTab({ iframe_url: formattedUrl }))
    }
  }

  const { focusedTab, tabs } = useSelector((state) => state.chrome)
  const activeTab = tabs.find((tab) => tab.id === focusedTab)

  useClickOutside(() => {
    setIsFocused(false)
  }, frame)

  useEffect(() => {
    if (frame.current) {
      frame.current.style.zIndex = `${zIndex}`
    }
    if (activeTab) {
      setUrl(activeTab.url)
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
      className={`absolute h-1/2 min-h-[300px] w-2/4 min-w-[750px] overflow-hidden rounded-md bg-white/20 shadow-xl backdrop-blur-xl ${isFocused ? 'brightness-100' : 'brightness-90'} ${status === 'minimize' ? 'hidden' : ''}`}
    >
      <div className="relative h-full">
        <div
          ref={t}
          className="absolute top-0 z-10 h-1 w-full cursor-ns-resize bg-transparent"
        />
        <div
          ref={b}
          className="absolute bottom-0 z-10 h-1 w-full cursor-ns-resize bg-transparent"
        />
        <div
          ref={r}
          className="absolute right-0 z-10 h-full w-1 cursor-ew-resize bg-transparent"
        />
        <div
          ref={l}
          className="absolute left-0 z-10 h-full w-1 cursor-ew-resize bg-transparent"
        />
        <div
          ref={tl}
          className="absolute left-0 top-0 z-20 size-2 cursor-nwse-resize bg-transparent"
        />
        <div
          ref={tr}
          className="absolute right-0 top-0 z-20 size-2 cursor-nesw-resize bg-transparent"
        />
        <div
          ref={bl}
          className="absolute bottom-0 left-0 z-20 size-2 cursor-nesw-resize bg-transparent"
        />
        <div
          ref={br}
          className="absolute bottom-0 right-0 z-20 size-2 cursor-nwse-resize bg-transparent"
        />

        <div
          ref={frameHeader}
          onDoubleClick={onFullScreen}
          className="grid !cursor-custom-auto grid-cols-[auto,1fr] bg-light-background py-2 pb-1 dark:bg-dark-background"
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
                <IconX className="size-full text-black opacity-0 group-hover:opacity-100" />
              </div>
            </button>
            <button
              onClick={onMinimize}
              className="!cursor-custom-auto p-1"
              type="button"
            >
              <div className="size-3 rounded-full bg-[#FFC130]">
                <IconMinus className="size-full text-black opacity-0 group-hover:opacity-100" />
              </div>
            </button>
            <button
              onClick={onFullScreen}
              className="!cursor-custom-auto p-1 group/fullscreen relative"
              type="button"
            >
              <div className="size-3 rounded-full bg-[#27CA40]">
                <IconBracketsAngle className="size-full -rotate-45 text-black opacity-0 group-hover:opacity-100" />
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation()
                }}
                className="invisible absolute -left-5 top-7 z-[1000] transition-all delay-200 group-hover/fullscreen:visible"
              >
                <div className="relative w-56 rounded-md border-2 border-[#e1e1e1] bg-[#f3f3f3] p-2 shadow-xl dark:border-[#3e3e3e] dark:bg-[#181818]">
                  <span className="absolute -top-[9px] left-5 block size-4 rotate-45 rounded-tl border-l-2 border-t-2 border-[#e1e1e1] bg-[#f3f3f3] dark:border-[#3e3e3e] dark:bg-[#181818]" />
                  <h2 className="text-start text-sm font-medium text-[#afafaf]">
                    Move & Resize
                  </h2>
                  <div className="grid grid-cols-4 items-center gap-5 p-4">
                    <div
                      onClick={onLeftScreen}
                      className="flex h-5 justify-start rounded border-2 border-dark-background p-[1px] dark:border-light-background/80"
                    >
                      <div className="h-full w-1/2 rounded-sm bg-dark-background dark:bg-light-background/80"></div>
                    </div>
                    <div
                      onClick={onRightScreen}
                      className="flex h-5 justify-end rounded border-2 border-dark-background p-[1px] dark:border-light-background/80"
                    >
                      <div className="h-full w-1/2 rounded-sm bg-dark-background dark:bg-light-background/80"></div>
                    </div>
                    <div
                      onClick={onTopScreen}
                      className="flex h-5 items-start rounded border-2 border-dark-background p-[1px] dark:border-light-background/80"
                    >
                      <div className="h-1/2 w-full rounded-sm bg-dark-background dark:bg-light-background/80"></div>
                    </div>
                    <div
                      onClick={onBottomScreen}
                      className="flex h-5 items-end rounded border-2 border-dark-background p-[1px] dark:border-light-background/80"
                    >
                      <div className="h-1/2 w-full rounded-sm bg-dark-background dark:bg-light-background/80"></div>
                    </div>
                  </div>
                  <div className="mb-1 h-[1px] bg-[#bbb] dark:bg-[#5b5b5b]" />
                  <div>
                    <div
                      onClick={onFullScreen}
                      className="flex w-full items-center justify-between rounded-md bg-primary px-2 py-[2px] text-sm text-white"
                    >
                      <span>
                        {isFullscreen ? 'Exit Full Screen' : 'Full Screen'}
                      </span>
                      <IconChevronRight stroke={2} className="size-5" />
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>
          <div className="flex gap-1 text-sm">
            {tabs.map((tab) => (
              <button
                onClick={() => {
                  dispatch(focusTab(tab.id))
                  setUrl(tab.url)
                }}
                key={tab.id}
                className="relative flex w-full max-w-40 items-center justify-between rounded-t-md bg-light-foreground px-3 py-[6px] dark:bg-[#35363A]"
              >
                <span className="line-clamp-1">{tab.title}</span>
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
                  <span className="absolute -bottom-1 left-0 h-1 w-full bg-light-foreground dark:bg-[#35363A]"></span>
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
        <div className="h-full max-h-[calc(100%-40px)] overflow-y-auto bg-light-background dark:bg-dark-background">
          <div className="flex items-center gap-3 bg-light-foreground px-2 py-1 dark:bg-[#35363A]">
            <IconArrowLeft stroke={2} className="text-gray-500" />
            <IconArrowRight stroke={2} className="text-gray-500" />
            <IconReload stroke={2} />
            <IconHome stroke={2} />
            <form onSubmit={handleSubmit} className="w-full">
              <input
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value)
                  dispatch(updateTab({ url: e.target.value }))
                }}
                type="text"
                placeholder="Search"
                className="w-full rounded-2xl border-2 border-light-border bg-light-background px-3 py-1 text-sm focus:border-[#858585] focus:outline-none dark:border-[#191919] dark:bg-[#1d1d1d]"
              />
              <input type="submit" hidden />
            </form>
            <IconDotsVertical stroke={2} />
          </div>
          {activeTab && activeTab.iframe_url ? (
            <iframe
              className="h-[calc(100%-40px)] w-full"
              src={activeTab.iframe_url}
            />
          ) : (
            <div className="flex h-[calc(100%-40px)] w-full flex-col items-center justify-center gap-6">
              {theme === 'dark' ? (
                <div
                  style={{
                    maskImage: "url('/assets/icons/google_logo.svg')",
                    maskRepeat: 'no-repeat',
                    maskSize: '100%',
                  }}
                  className="h-[92px] w-[272px] bg-white forced-color-adjust-none"
                />
              ) : (
                <Image alt="" src={googleIcon} className="" />
              )}
              <input
                type="text"
                placeholder="Search Google"
                className="h-12 w-full max-w-xl rounded-full border-2 border-light-border bg-light-background px-3 text-sm focus:border-[#858585] focus:outline-none dark:border-[#858585] dark:bg-[#1d1d1d]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
