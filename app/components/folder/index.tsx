'use client'

import { openFolder } from '@/app/features/window-slice'
import { useDispatch } from '@/app/store'
import { useGSAP } from '@gsap/react'
import { IconFolder } from '@tabler/icons-react'
import { Draggable } from 'gsap/Draggable'
import { useRef } from 'react'

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
      className="flex w-fit flex-col items-center p-4"
    >
      <IconFolder className="size-16 text-orange-400" stroke={1.2} />
      <span className="text-[#dfdfdf]">{name}</span>
    </button>
  )
}
