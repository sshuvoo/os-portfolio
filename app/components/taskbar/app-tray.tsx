'use client'

import { minimizeFolder, openFolder } from '@/app/features/window-slice'
import { useDispatch, useSelector } from '@/app/store'
import acrobat from '@/public/assets/icons/Acrobat.svg'
import safari from '@/public/assets/icons/Safari.png'
import contactIcon from '@/public/assets/icons/Contacts.svg'
import finder from '@/public/assets/icons/Finder.png'
import settings from '@/public/assets/icons/Settings.png'
import notes from '@/public/assets/icons/Notes.png'
import terminalIcon from '@/public/assets/icons/Terminal.png'
import messageIcon from '@/public/assets/icons/Messages.svg'
import photoIcon from '@/public/assets/icons/Photos.svg'
import calculator from '@/public/assets/icons/calculator.png'
import { IconFolderUp } from '@tabler/icons-react'
import Image from 'next/image'

export default function AppTray() {
  const folders = useSelector((state) => state.windowFrame)
  const minimizeFolders = folders.filter(
    (folder) => folder.status !== 'close' && folder.placement === 'desktop'
  )
  const dispatch = useDispatch()
  const taskbarApps = folders.filter((f) => f.placement === 'taskbar')

  return (
    <div className="rounded-xl bg-white/20 p-1 px-2 backdrop-blur">
      <div className="flex items-center gap-2 pb-[5px]">
        <button>
          <Image alt="" src={finder} width={50} height={50} />
        </button>
        <Image className="" alt="" src={messageIcon} width={50} height={50} />
        <Image className="" alt="" src={contactIcon} width={50} height={50} />
        <Image className="" alt="" src={photoIcon} width={50} height={50} />
        {taskbarApps.map((folder) => (
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
            {folder.type === 'folder' && folder.id === 'settings' && (
              <Image alt="" src={settings} width={50} height={50} />
            )}
            {folder.type === 'folder' && folder.id === 'inotes' && (
              <Image alt="" src={notes} width={50} height={50} />
            )}
            {folder.type === 'folder' && folder.id === 'terminal' && (
              <Image alt="" src={terminalIcon} width={50} height={50} />
            )}
            {folder.type === 'browser' && (
              <Image alt="" src={safari} width={50} height={50} />
            )}
            {folder.type === 'calculator' && (
              <Image alt="calculator" src={calculator} width={50} height={50} />
            )}
            <span className="absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded bg-[#3e3e3e] px-3 py-1 text-xs shadow-md group-hover:inline-block">
              {folder.name}
            </span>
            {(folder.status === 'open' || folder.status === 'minimize') && (
              <span className="absolute -bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-green-400"></span>
            )}
          </button>
        ))}
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
            {folder.type === 'folder' && (
              <IconFolderUp className="size-11 text-orange-400" stroke={1.2} />
            )}
            {folder.type === 'pdf' && (
              <div className="flex size-11 items-center justify-center">
                <Image alt="pdf" src={acrobat} width={35} height={35} />
              </div>
            )}
            {folder.type === 'browser' && (
              <div className="flex size-11 items-center justify-center">
                <Image alt="pdf" src={safari} width={35} height={35} />
              </div>
            )}
            {folder.type === 'calculator' && (
              <div className="flex size-11 items-center justify-center">
                <Image
                  alt="calculator"
                  src={calculator}
                  width={50}
                  height={50}
                />
              </div>
            )}
            <span className="absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded bg-[#3e3e3e] px-3 py-1 text-xs shadow-md group-hover:inline-block">
              {folder.name}
            </span>
            <span className="absolute -bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-green-400"></span>
          </button>
        ))}
      </div>
    </div>
  )
}
