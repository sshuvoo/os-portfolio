import { useEffect } from 'react'

export function useClickOutside(
  onAction: () => void,
  ref: { current: HTMLElement | null }
) {
  useEffect(() => {
    const handleAction = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onAction()
      }
    }

    document.addEventListener('click', handleAction)
    document.addEventListener('contextmenu', handleAction)
    document.addEventListener('dblclick', handleAction)
    return () => {
      document.removeEventListener('click', handleAction)
      document.removeEventListener('contextmenu', handleAction)
      document.removeEventListener('dblclick', handleAction)
    }
  }, [onAction, ref])
}
