'use client'

import { deleteFolder, openFolder } from '@/app/features/window-slice'
import { useDispatch, useSelector } from '@/app/store'
import { useGSAP } from '@gsap/react'
import { Draggable } from 'gsap/Draggable'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import { RandomFolder } from './random-folder'
import { Status } from './folders'
import { FolderCtxMenu } from '../context-menu/folder-menu'
import { createPortal } from 'react-dom'
import { Alert } from '../alert'
import { FolderRename } from './folder-rename'
import { useClickOutside } from '@/app/hooks/use-click-outside'
import { addToTrash } from '@/app/features/trash'
import { setZIndex } from '@/app/features/settings'

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
  const dragRef = useRef<globalThis.Draggable[]>()
  const dispatch = useDispatch()
  const [ctxPosition, setCtxPosition] = useState<{
    x: number
    y: number
  } | null>(null)

  const [mode, setMode] = useState<'rename' | 'idle'>('idle')
  const [isSelected, setIsSelected] = useState(false)
  const { zIndex } = useSelector((state) => state.settings)
  useGSAP(() => {
    dragRef.current = Draggable.create(folderRef.current, {
      bounds: 'body',
      allowContextMenu: true,
      dragClickables: false,
      zIndexBoost: false,
      force3D: false,
      type: 'x,y',
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

  const onOpenFolder = () => {
    dispatch(setZIndex(zIndex + 1))
    dispatch(openFolder(id))
    if (status === 'minimize' && onMinimizeRestore) {
      onMinimizeRestore()
    }
  }

  useClickOutside(() => {
    if (isSelected) {
      setIsSelected(false)
    }
  }, folderRef)

  return (
    <>
      <div
        onClick={() => {
          setIsSelected(true)
        }}
        onContextMenu={handleContextMenu}
        onDoubleClick={onOpenFolder}
        ref={folderRef}
        className={`flex w-28 !cursor-custom-auto flex-col items-center border p-4 ${ctxPosition || mode === 'rename' || isSelected ? 'border-[#18779fe0] bg-[#18779f63]' : 'border-transparent'}`}
      >
        <RandomFolder type={type} id={id} />
        {mode === 'rename' ? (
          <FolderRename
            name={name}
            id={id}
            onClose={() => {
              setMode('idle')
              if (dragRef.current) {
                dragRef.current[0].enable()
              }
            }}
          />
        ) : (
          <p
            onClick={() => {
              if (isSelected) {
                setMode('rename')
              }
            }}
            className="dark:text-light line-clamp-2 w-full text-center"
          >
            {name}
          </p>
        )}
      </div>
      {ctxPosition && (
        <FolderCtxMenu
          onDelete={onDelete}
          onOpenFolder={onOpenFolder}
          name={name}
          type={type}
          onRename={() => {
            setMode('rename')
            if (dragRef.current) {
              dragRef.current[0].kill()
            }
          }}
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
                : `${name} will be moved to Trash. \n You can restore later`
            }
            onClose={() => void setIsAlertOpen(false)}
            onConfirm={() => {
              dispatch(deleteFolder(name))
              dispatch(
                addToTrash({
                  id,
                  name,
                  placement: 'desktop',
                  status,
                  type,
                })
              )
            }}
          />,
          document.getElementById('modal')!
        )}
    </>
  )
}
