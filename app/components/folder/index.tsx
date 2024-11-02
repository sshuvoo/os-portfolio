'use client'

import { openFolder } from '@/app/features/window-slice'
import { useDispatch } from '@/app/store'
import { useGSAP } from '@gsap/react'
import { Draggable } from 'gsap/Draggable'
import { useRef } from 'react'
import { RandomFolder } from './random-folder'
import { Status } from './folders'

export function Folder({
  id,
  name,
  status,
  onMinimizeRestore,
  type,
}: {
  id: string
  name: string
  status: Status
  onMinimizeRestore?: () => void
  type: 'folder' | 'pdf' | 'browser' | 'calculator'
}) {
  const folderRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()

  useGSAP(() => {
    Draggable.create(folderRef.current, {
      bounds: 'body',
    })
  })

  return (
    <div
      onDoubleClick={() => {
        dispatch(openFolder(id))
        if (status === 'minimize' && onMinimizeRestore) {
          onMinimizeRestore()
        }
      }}
      ref={folderRef}
      className="flex size-28 !cursor-custom-auto flex-col items-center p-4"
    >
      <RandomFolder type={type} />
      <span className="text-[#dfdfdf]">{name}</span>
    </div>
  )
}
