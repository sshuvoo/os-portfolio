'use client'

import { openFolder } from '@/app/features/window-slice'
import { useDispatch } from '@/app/store'
import { useGSAP } from '@gsap/react'
import { Draggable } from 'gsap/Draggable'
import { useRef } from 'react'
import { RandomFolder } from './random-folder'

export function Folder({ id, name }: { id: string; name: string }) {
  const folderRef = useRef<HTMLButtonElement>(null)
  const dispatch = useDispatch()

  useGSAP(() => {
    Draggable.create(folderRef.current, {
      bounds: 'body',
    })
  })

  return (
    <button
      onDoubleClick={() => {
        dispatch(openFolder(id))
      }}
      type="button"
      ref={folderRef}
      className="flex size-28 flex-col items-center p-4"
    >
      <RandomFolder />
      <span className="text-[#dfdfdf]">{name}</span>
    </button>
  )
}
