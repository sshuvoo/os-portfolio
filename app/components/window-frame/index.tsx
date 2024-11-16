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
import { ReactNode, useEffect, useRef, useState } from 'react'
import { Status } from '../folder/folders'
import { useDispatch, useSelector } from '@/app/store'
import { closeFolder, minimizeFolder } from '@/app/features/window-slice'
import { Size, useResize } from '@/app/hooks/use-resize'
import { setActiveApp, setZIndex } from '@/app/features/settings'
import { useClickOutside } from '@/app/hooks/use-click-outside'
const size: Size = { minW: 750, minH: 300 }

export function WindowFrame({
  enableSidebar = true,
  children,
  frameName,
  frame_id,
  status,
}: {
  children: ReactNode
  frameName: string
  frame_id: string
  status: Status
  enableSidebar?: boolean
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
  const r = useResize({ frame, place: 'r', size, onDragEnable, onDragDisable })
  const l = useResize({ frame, place: 'l', size, onDragEnable, onDragDisable })
  const bl = useResize({
    frame,
    place: 'bl',
    size,
    onDragEnable,
    onDragDisable,
  })
  const b = useResize({ frame, place: 'b', size, onDragEnable, onDragDisable })
  const br = useResize({
    frame,
    place: 'br',
    size,
    onDragEnable,
    onDragDisable,
  })

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
      className={`absolute h-1/2 min-h-[300px] w-2/4 min-w-[750px] overflow-hidden rounded-md bg-white/20 shadow-2xl backdrop-blur-xl ${isFocused ? 'brightness-100' : 'brightness-90'} ${status === 'minimize' ? 'hidden' : ''}`}
    >
      <div className="relative h-full">
        {!isFullscreen && (
          <>
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
          </>
        )}
        <div
          ref={frameHeader}
          onDoubleClick={onFullScreen}
          className="relative grid !cursor-custom-auto grid-cols-[250px,1fr]"
        >
          <div
            className={`group flex items-center p-3 ${enableSidebar ? 'bg-light-foreground dark:bg-dark-foreground' : 'bg-light-background dark:bg-dark-background'}`}
          >
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
              className="group/fullscreen relative !cursor-custom-auto p-1"
              type="button"
            >
              <div className="size-3 rounded-full bg-green-500">
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
          {!enableSidebar && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <h3 className="font-semibold">{frameName}</h3>
            </div>
          )}
          <div
            className={`items-center bg-light-background px-4 text-light-text dark:bg-dark-background dark:text-dark-text ${enableSidebar ? 'grid grid-cols-[1fr,auto] justify-between' : 'flex justify-end'}`}
          >
            {enableSidebar && (
              <div className="dark:text-light-primary text-dark-primary flex !cursor-custom-auto items-center gap-2">
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
            )}
            <div className="flex items-center gap-2 text-[#8d8d8d]">
              <button>
                <IconListDetails stroke={2} />
              </button>
              <button>
                <IconLayoutBoard stroke={2} />
              </button>
            </div>
          </div>
        </div>
        <div className="h-full max-h-[calc(100%-44px)] bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text">
          {children}
        </div>
      </div>
    </div>
  )
}
