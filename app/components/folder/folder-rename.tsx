import { renameFolder } from '@/app/features/window-slice'
import { useClickOutside } from '@/app/hooks/use-click-outside'
import { useDispatch } from '@/app/store'
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'

export function FolderRename({
  id,
  name,
  onClose,
}: {
  id: string
  name: string
  onClose: () => void
}) {
  const [rename, setRename] = useState(name)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const dispatch = useDispatch()

  const onRename = () => {
    dispatch(renameFolder({ id, name: rename || name }))
    onClose()
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onRename()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onRename()
    }
  }

  useEffect(() => {
    if (inputRef.current instanceof HTMLTextAreaElement) {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
      inputRef.current.focus()
      const length = inputRef.current.value.length
      inputRef.current.setSelectionRange(length, length)
    }
  }, [])

  useClickOutside(onRename, inputRef)

  return (
    <form
      onDoubleClick={(e) => {
        e.stopPropagation()
      }}
      onSubmit={handleSubmit}
      className="flex w-full justify-center"
    >
      <textarea
        ref={inputRef}
        style={{ width: rename.length >= 2 ? rename.length + 'ch' : '2ch' }}
        className="max-h-40 max-w-full resize-none bg-[#1a1a1a] text-center text-white focus:outline-none"
        value={rename}
        rows={1}
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          setRename(e.target.value)
          e.target.style.height = 'auto'
          e.target.style.height = `${e.target.scrollHeight}px`
        }}
      />
      <input type="submit" hidden />
    </form>
  )
}
