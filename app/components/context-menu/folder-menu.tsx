import {
  copyFolder,
  deleteFolder,
  openFolder,
} from '@/app/features/window-slice'
import { useDispatch } from '@/app/store'
import { IoIosArrowForward } from 'react-icons/io'
import { Status } from '../folder/folders'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Alert } from '../alert'

export function FolderCtxMenu({
  position,
  id,
  name,
  status,
  type,
  onDelete,
}: {
  id: string
  name: string
  status: Status
  type: 'folder' | 'pdf' | 'browser' | 'calculator'
  position: { x: number; y: number }
  onDelete: () => void
}) {
  const dispatch = useDispatch()

  return (
    <div
      style={{
        top: position.y,
        left: position.x,
      }}
      onContextMenu={(e) => {
        e.stopPropagation()
      }}
      className="absolute z-[9999] w-52 rounded-md bg-[#343434] text-sm shadow-2xl"
    >
      <ul className="space-y-1 p-2 [&>li:hover]:bg-[#222222] [&>li]:rounded-md [&>li]:p-[3px] [&>li]:px-2 [&>li]:text-[#e0e0e0]">
        <li
          onClick={() => {
            dispatch(openFolder(id))
          }}
          className="relative !mb-2 after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-full after:bg-[#5a5a5a] after:content-['']"
        >
          Open
        </li>
        <li
          onClick={onDelete}
          className="relative !mb-2 after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-full after:bg-[#5a5a5a] after:content-['']"
        >
          Move to Trash
        </li>
        <li className="relative !mb-2 flex items-center justify-between !text-[#888888] after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-full after:bg-[#5a5a5a] after:content-['']">
          <span>Get Info</span>
          <IoIosArrowForward />
        </li>
        <li>Rename</li>
        <li className="!text-[#888888]">Use Stacks</li>
        <li
          onClick={() => {
            dispatch(
              copyFolder({
                id,
                name: name + '-copy',
                placement: 'desktop',
                status: 'close',
                type,
              })
            )
          }}
        >
          Duplicate
        </li>
        <li className="!text-[#888888]">Clean Up</li>
        <li className="flex items-center justify-between !text-[#888888]">
          <span>Copy</span>
          <IoIosArrowForward />
        </li>
        <li className="flex items-center justify-between !text-[#888888]">
          <span>Share</span>
          <IoIosArrowForward />
        </li>
      </ul>
     
    </div>
  )
}
