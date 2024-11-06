'use client'

import { deleteFolder, openFolder } from '@/app/features/window-slice'
import { useDispatch } from '@/app/store'
import { useGSAP } from '@gsap/react'
import { Draggable } from 'gsap/Draggable'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import { RandomFolder } from './random-folder'
import { Status } from './folders'
import { FolderCtxMenu } from '../context-menu/folder-menu'
import { createPortal } from 'react-dom'
import { Alert } from '../alert'

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
  const [ctxPosition, setCtxPosition] = useState<{
    x: number
    y: number
  } | null>(null)

  useGSAP(() => {
    Draggable.create(folderRef.current, {
      bounds: 'body',
      allowContextMenu: true,
    })
  })

  const handleContextMenu = (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    event.preventDefault()
    event.stopPropagation()
    const coX =
      innerWidth - event.clientX > 256 ? event.clientX : event.clientX - 256
    const coY =
      innerHeight - event.clientY > 294 ? event.clientY : event.clientY - 294
    setCtxPosition({ x: coX, y: coY })
  }

  useEffect(() => {
    const onCloseCtx = (event: globalThis.MouseEvent) => {
      if (
        folderRef.current &&
        !folderRef.current.contains(event.target as Node)
      ) {
        setCtxPosition(null)
      }
    }
    const onReset = () => void setCtxPosition(null)

    document.addEventListener('contextmenu', onCloseCtx)
    document.addEventListener('click', onReset)
    document.addEventListener('dblclick', onReset)
    return () => {
      document.removeEventListener('contextmenu', onCloseCtx)
      document.removeEventListener('click', onReset)
      document.removeEventListener('dblclick', onReset)
    }
  }, [])

  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const onDelete = () => {
    setIsAlertOpen(true)
  }

  return (
    <>
      <div
        onContextMenu={handleContextMenu}
        onDoubleClick={() => {
          dispatch(openFolder(id))
          if (status === 'minimize' && onMinimizeRestore) {
            onMinimizeRestore()
          }
        }}
        ref={folderRef}
        className={`flex size-28 !cursor-custom-auto flex-col items-center p-4 ${ctxPosition ? 'border border-[#18779fe0] bg-[#18779f63]' : ''}`}
      >
        <RandomFolder type={type} />
        <span className="text-[#dfdfdf]">{name}</span>
      </div>
      {ctxPosition && (
        <FolderCtxMenu
          onDelete={onDelete}
          name={name}
          type={type}
          position={ctxPosition}
          id={id}
        />
      )}
      {isAlertOpen &&
        createPortal(
          <Alert
            heading={id === 'resume' ? 'Are you kidding?' : undefined}
            message={
              id === 'resume'
                ? 'Why are you deleting my resume? \n আমরা কি এই স্বাধীনতা চেয়েছিলাম!'
                : undefined
            }
            onClose={() => void setIsAlertOpen(false)}
            onConfirm={() => {
              dispatch(deleteFolder(name))
            }}
          />,
          document.getElementById('modal')!
        )}
    </>
  )
}
