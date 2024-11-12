import { useRef } from 'react'

export function useDebounce<T>(func: (...args: T[]) => void, delay: number) {
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null)
  return (...args: T[]): void => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
    }
    timeoutId.current = setTimeout(() => {
      func(...args)
    }, delay * 1000)
  }
}
