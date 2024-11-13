import gsap from 'gsap'
import { useEffect, useRef } from 'react'
export type Place = 't' | 'b' | 'l' | 'r' | 'tl' | 'tr' | 'bl' | 'br'
export type Frame = { current: HTMLDivElement | null }
export type Size = {
  minW?: number
  minH?: number
  maxW?: number
  maxH?: number
}

export const useResize = ({
  place,
  frame,
  size: { minW = 300, minH = 250, maxW, maxH },
  onDragEnable,
  onDragDisable,
}: {
  place: Place
  frame: Frame
  size: Size
  onDragEnable?: () => void
  onDragDisable?: () => void
}) => {
  const triggerPanel = useRef<HTMLDivElement>(null)
  const timeline = useRef(gsap.timeline({ defaults: { duration: 0 } }))

  useEffect(() => {
    const panel = triggerPanel.current
    const onResize = (e: MouseEvent) => {
      if (frame.current instanceof HTMLDivElement) {
        const rect = frame.current.getBoundingClientRect()
        if (place === 'l') {
          const newWidth = rect.right - e.clientX
          if (maxW) {
            if (
              (newWidth >= minW ||
                (minW > rect.width && newWidth > rect.width)) &&
              (newWidth <= maxW ||
                (rect.width > maxW && newWidth < rect.width)) &&
              newWidth > 0
            ) {
              timeline.current.to(frame.current, {
                width: newWidth,
                left: e.clientX,
              })
            }
          } else {
            if (
              (newWidth >= minW ||
                (minW > rect.width && newWidth > rect.width)) &&
              newWidth > 0
            ) {
              timeline.current.to(frame.current, {
                width: newWidth,
                left: e.clientX,
              })
            }
          }
        } else if (place === 'r') {
          const newWidth = e.clientX - rect.left
          if (maxW) {
            if (
              (newWidth >= minW ||
                (minW > rect.width && newWidth > rect.width)) &&
              (newWidth <= maxW ||
                (rect.width > maxW && newWidth < rect.width)) &&
              newWidth > 0
            ) {
              timeline.current.to(frame.current, {
                width: newWidth,
              })
            }
          } else {
            if (
              (newWidth >= minW ||
                (minW > rect.width && newWidth > rect.width)) &&
              newWidth > 0
            ) {
              timeline.current.to(frame.current, {
                width: newWidth,
              })
            }
          }
        } else if (place === 'b') {
          const newHeight = e.clientY - rect.top
          if (maxH) {
            if (
              (newHeight >= minH ||
                (minH > rect.height && newHeight > rect.height)) &&
              (newHeight <= maxH ||
                (rect.height > maxH && newHeight < rect.height)) &&
              newHeight > 0
            ) {
              timeline.current.to(frame.current, {
                height: newHeight,
              })
            }
          } else {
            if (
              (newHeight >= minH ||
                (minH > rect.height && newHeight > rect.height)) &&
              newHeight > 0
            ) {
              timeline.current.to(frame.current, {
                height: newHeight,
              })
            }
          }
        } else if (place === 't') {
          const newHeight = rect.bottom - e.clientY
          if (maxH) {
            if (
              (newHeight >= minH ||
                (minH > rect.height && newHeight > rect.height)) &&
              (newHeight <= maxH ||
                (rect.height > maxH && newHeight < rect.height)) &&
              newHeight > 0
            ) {
              timeline.current.to(frame.current, {
                height: newHeight,
                top: e.clientY,
              })
            }
          } else {
            if (
              (newHeight >= minH ||
                (minH > rect.height && newHeight > rect.height)) &&
              newHeight > 0
            ) {
              timeline.current.to(frame.current, {
                height: newHeight,
                top: e.clientY,
              })
            }
          }
        } else if (place === 'tl') {
          const newHeight = rect.bottom - e.clientY
          const newWidth = rect.right - e.clientX
          if (maxH) {
            if (
              (newHeight >= minH ||
                (minH > rect.height && newHeight > rect.height)) &&
              (newHeight <= maxH ||
                (rect.height > maxH && newHeight < rect.height)) &&
              newHeight > 0
            ) {
              timeline.current.to(frame.current, {
                height: newHeight,
                top: e.clientY,
              })
            }
          } else {
            if (
              (newHeight >= minH ||
                (minH > rect.height && newHeight > rect.height)) &&
              newHeight > 0
            ) {
              timeline.current.to(frame.current, {
                height: newHeight,
                top: e.clientY,
              })
            }
          }

          if (maxW) {
            if (
              (newWidth >= minW ||
                (minW > rect.width && newWidth > rect.width)) &&
              (newWidth <= maxW ||
                (rect.width > maxW && newWidth < rect.width)) &&
              newWidth > 0
            ) {
              timeline.current.to(frame.current, {
                width: newWidth,
                left: e.clientX,
              })
            }
          } else {
            if (
              (newWidth >= minW ||
                (minW > rect.width && newWidth > rect.width)) &&
              newWidth > 0
            ) {
              timeline.current.to(frame.current, {
                width: newWidth,
                left: e.clientX,
              })
            }
          }
        } else if (place === 'tr') {
          const newHeight = rect.bottom - e.clientY
          const newWidth = e.clientX - rect.left
          if (maxH) {
            if (
              (newHeight >= minH ||
                (minH > rect.height && newHeight > rect.height)) &&
              (newHeight <= maxH ||
                (rect.height > maxH && newHeight < rect.height)) &&
              newHeight > 0
            ) {
              timeline.current.to(frame.current, {
                height: newHeight,
                top: e.clientY,
              })
            }
          } else {
            if (
              (newHeight >= minH ||
                (minH > rect.height && newHeight > rect.height)) &&
              newHeight > 0
            ) {
              timeline.current.to(frame.current, {
                height: newHeight,
                top: e.clientY,
              })
            }
          }

          if (maxW) {
            if (
              (newWidth >= minW ||
                (minW > rect.width && newWidth > rect.width)) &&
              (newWidth <= maxW ||
                (rect.width > maxW && newWidth < rect.width)) &&
              newWidth > 0
            ) {
              timeline.current.to(frame.current, {
                width: newWidth,
              })
            }
          } else {
            if (
              (newWidth >= minW ||
                (minW > rect.width && newWidth > rect.width)) &&
              newWidth > 0
            ) {
              timeline.current.to(frame.current, {
                width: newWidth,
              })
            }
          }
        } else if (place === 'bl') {
          const newWidth = rect.right - e.clientX
          const newHeight = e.clientY - rect.top
          if (maxH) {
            if (
              (newHeight >= minH ||
                (minH > rect.height && newHeight > rect.height)) &&
              (newHeight <= maxH ||
                (rect.height > maxH && newHeight < rect.height)) &&
              newHeight > 0
            ) {
              timeline.current.to(frame.current, {
                height: newHeight,
              })
            }
          } else {
            if (
              (newHeight >= minH ||
                (minH > rect.height && newHeight > rect.height)) &&
              newHeight > 0
            ) {
              timeline.current.to(frame.current, {
                height: newHeight,
              })
            }
          }

          if (maxW) {
            if (
              (newWidth >= minW ||
                (minW > rect.width && newWidth > rect.width)) &&
              (newWidth <= maxW ||
                (rect.width > maxW && newWidth < rect.width)) &&
              newWidth > 0
            ) {
              timeline.current.to(frame.current, {
                width: newWidth,
                left: e.clientX,
              })
            }
          } else {
            if (
              (newWidth >= minW ||
                (minW > rect.width && newWidth > rect.width)) &&
              newWidth > 0
            ) {
              timeline.current.to(frame.current, {
                width: newWidth,
                left: e.clientX,
              })
            }
          }
        } else if (place === 'br') {
          const newWidth = e.clientX - rect.left
          const newHeight = e.clientY - rect.top
          if (maxH) {
            if (
              (newHeight >= minH ||
                (minH > rect.height && newHeight > rect.height)) &&
              (newHeight <= maxH ||
                (rect.height > maxH && newHeight < rect.height)) &&
              newHeight > 0
            ) {
              timeline.current.to(frame.current, {
                height: newHeight,
              })
            }
          } else {
            if (
              (newHeight >= minH ||
                (minH > rect.height && newHeight > rect.height)) &&
              newHeight > 0
            ) {
              timeline.current.to(frame.current, {
                height: newHeight,
              })
            }
          }
          if (maxW) {
            if (
              (newWidth >= minW ||
                (minW > rect.width && newWidth > rect.width)) &&
              (newWidth <= maxW ||
                (rect.width > maxW && newWidth < rect.width)) &&
              newWidth > 0
            ) {
              timeline.current.to(frame.current, {
                width: newWidth,
              })
            }
          } else {
            if (
              (newWidth >= minW ||
                (minW > rect.width && newWidth > rect.width)) &&
              newWidth > 0
            ) {
              timeline.current.to(frame.current, {
                width: newWidth,
              })
            }
          }
        }
      }
    }

    const onClear = () => {
      if (onDragEnable) {
        onDragEnable()
      }
      window.removeEventListener('mousemove', onResize)
      window.removeEventListener('mouseup', onClear)
    }

    const onWatch = () => {
      if (onDragDisable) {
        onDragDisable()
      }
      window.addEventListener('mousemove', onResize)
      window.addEventListener('mouseup', onClear)
    }

    if (panel instanceof HTMLDivElement) {
      panel.addEventListener('mousedown', onWatch)
    }

    return () => {
      if (panel instanceof HTMLDivElement) {
        panel.removeEventListener('mousedown', onWatch)
      }
    }
  }, [frame, place, maxW, minW, maxH, minH, onDragEnable, onDragDisable])

  return triggerPanel
}
