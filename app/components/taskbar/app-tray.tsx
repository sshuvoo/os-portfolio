'use client'

import {
  addFolder,
  minimizeFolder,
  openFolder,
} from '@/app/features/window-slice'
import { useDispatch, useSelector } from '@/app/store'
import { IconBrandPowershell, IconFolderUp } from '@tabler/icons-react'
import Image from 'next/image'
import finder from '@/public/assets/icons/Finder.svg'
import messageIcon from '@/public/assets/icons/Messages.svg'
import contactIcon from '@/public/assets/icons/Contacts.svg'
import photoIcon from '@/public/assets/icons/Photos.svg'
import reminderIcon from '@/public/assets/icons/Reminders.svg'
import { FiSearch } from 'react-icons/fi'

export default function AppTray() {
  const folders = useSelector((state) => state.windowFrame)
  const minimizeFolders = folders.filter(
    (folder) => folder.status !== 'close' && folder.placement === 'desktop'
  )
  const terminal = folders.find((folder) => folder.id === 'terminal')
  const dispatch = useDispatch()

  return (
    <div>
      <div className="flex items-center gap-2">
        <button>
          <Image alt="" src={finder} width={44} height={44} />
        </button>
        <div className="flex size-11 items-center justify-center md:hidden">
          <FiSearch className="size-9" />
        </div>
        <input
          type="text"
          placeholder="Search"
          className="hidden rounded-2xl border-2 border-[#191919] bg-[#1d1d1d] px-3 py-[5px] text-sm focus:border-[#858585] focus:outline-none md:inline-block"
        />
        <Image className="" alt="" src={messageIcon} width={44} height={44} />
        <Image className="" alt="" src={contactIcon} width={44} height={44} />
        <Image className="" alt="" src={photoIcon} width={44} height={44} />
        <Image className="" alt="" src={reminderIcon} width={44} height={44} />
        <button
          onClick={() => {
            if (terminal) {
              if (terminal.status === 'open') {
                dispatch(minimizeFolder('terminal'))
              } else {
                dispatch(openFolder('terminal'))
                if (terminal.onMinimizeRestore) {
                  terminal.onMinimizeRestore()
                }
              }
            } else
              dispatch(
                addFolder({
                  id: 'terminal',
                  name: 'Terminal',
                  status: 'open',
                  placement: 'taskbar',
                  type: 'folder',
                })
              )
          }}
          className="group relative"
        >
          <IconBrandPowershell
            className="size-11 text-green-500"
            stroke={1.2}
          />
          <span className="absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded bg-[#3e3e3e] px-3 py-1 text-xs shadow-md group-hover:inline-block">
            Terminal
          </span>
        </button>
        {minimizeFolders.map((folder) => (
          <button
            className="group relative"
            onClick={() => {
              if (folder.status === 'open') dispatch(minimizeFolder(folder.id))
              else {
                dispatch(openFolder(folder.id))
                if (folder.onMinimizeRestore) {
                  folder.onMinimizeRestore()
                }
              }
            }}
            key={folder.id}
          >
            <IconFolderUp className="size-11 text-orange-400" stroke={1.2} />
            <span className="absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded bg-[#3e3e3e] px-3 py-1 text-xs shadow-md group-hover:inline-block">
              {folder.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
