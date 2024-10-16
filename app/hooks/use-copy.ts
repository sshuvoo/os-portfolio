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
}: {
  place: Place
  frame: Frame
  size: Size
}) => {
  const triggerPanel = useRef<HTMLDivElement>(null)

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
              frame.current.style.width = `${newWidth}px`
              frame.current.style.left = `${e.clientX}px`
            }
          } else {
            if (
              (newWidth >= minW ||
                (minW > rect.width && newWidth > rect.width)) &&
              newWidth > 0
            ) {
              frame.current.style.width = `${newWidth}px`
              frame.current.style.left = `${e.clientX}px`
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
              frame.current.style.width = `${newWidth}px`
            }
          } else {
            if (
              (newWidth >= minW ||
                (minW > rect.width && newWidth > rect.width)) &&
              newWidth > 0
            ) {
              frame.current.style.width = `${newWidth}px`
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
              frame.current.style.height = `${newHeight}px`
            }
          } else {
            if (
              (newHeight >= minH ||
                (minH > rect.height && newHeight > rect.height)) &&
              newHeight > 0
            ) {
              frame.current.style.height = `${newHeight}px`
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
              frame.current.style.height = `${newHeight}px`
              frame.current.style.top = `${e.clientY}px`
            }
          } else {
            if (
              (newHeight >= minH ||
                (minH > rect.height && newHeight > rect.height)) &&
              newHeight > 0
            ) {
              frame.current.style.height = `${newHeight}px`
              frame.current.style.top = `${e.clientY}px`
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
              frame.current.style.height = `${newHeight}px`
              frame.current.style.top = `${e.clientY}px`
            }
          } else {
            if (
              (newHeight >= minH ||
                (minH > rect.height && newHeight > rect.height)) &&
              newHeight > 0
            ) {
              frame.current.style.height = `${newHeight}px`
              frame.current.style.top = `${e.clientY}px`
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
              frame.current.style.width = `${newWidth}px`
              frame.current.style.left = `${e.clientX}px`
            }
          } else {
            if (
              (newWidth >= minW ||
                (minW > rect.width && newWidth > rect.width)) &&
              newWidth > 0
            ) {
              frame.current.style.width = `${newWidth}px`
              frame.current.style.left = `${e.clientX}px`
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
              frame.current.style.height = `${newHeight}px`
              frame.current.style.top = `${e.clientY}px`
            }
          } else {
            if (
              (newHeight >= minH ||
                (minH > rect.height && newHeight > rect.height)) &&
              newHeight > 0
            ) {
              frame.current.style.height = `${newHeight}px`
              frame.current.style.top = `${e.clientY}px`
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
              frame.current.style.width = `${newWidth}px`
            }
          } else {
            if (
              (newWidth >= minW ||
                (minW > rect.width && newWidth > rect.width)) &&
              newWidth > 0
            ) {
              frame.current.style.width = `${newWidth}px`
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
              frame.current.style.height = `${newHeight}px`
            }
          } else {
            if (
              (newHeight >= minH ||
                (minH > rect.height && newHeight > rect.height)) &&
              newHeight > 0
            ) {
              frame.current.style.height = `${newHeight}px`
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
              frame.current.style.width = `${newWidth}px`
              frame.current.style.left = `${e.clientX}px`
            }
          } else {
            if (
              (newWidth >= minW ||
                (minW > rect.width && newWidth > rect.width)) &&
              newWidth > 0
            ) {
              frame.current.style.width = `${newWidth}px`
              frame.current.style.left = `${e.clientX}px`
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
              frame.current.style.height = `${newHeight}px`
            }
          } else {
            if (
              (newHeight >= minH ||
                (minH > rect.height && newHeight > rect.height)) &&
              newHeight > 0
            ) {
              frame.current.style.height = `${newHeight}px`
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
              frame.current.style.width = `${newWidth}px`
            }
          } else {
            if (
              (newWidth >= minW ||
                (minW > rect.width && newWidth > rect.width)) &&
              newWidth > 0
            ) {
              frame.current.style.width = `${newWidth}px`
            }
          }
        }
      }
    }

    const onClear = () => {
      document.removeEventListener('mousemove', onResize)
      document.removeEventListener('mouseup', onClear)
    }

    const onWatch = () => {
      document.addEventListener('mousemove', onResize)
      document.addEventListener('mouseup', onClear)
    }

    if (panel instanceof HTMLDivElement) {
      panel.addEventListener('mousedown', onWatch)
    }
    return () => {
      if (panel instanceof HTMLDivElement) {
        panel.removeEventListener('mousedown', onWatch)
      }
    }
  }, [frame, place, maxW, minW, maxH, minH])

  return triggerPanel
}
