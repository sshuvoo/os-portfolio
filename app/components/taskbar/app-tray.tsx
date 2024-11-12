'use client'

import { minimizeFolder, openFolder } from '@/app/features/window-slice'
import { useDispatch, useSelector } from '@/app/store'
import acrobat from '@/public/assets/icons/Acrobat.png'
import calculator from '@/public/assets/icons/calculator.png'
import contactIcon from '@/public/assets/icons/Contacts.png'
import finder from '@/public/assets/icons/Finder.png'
import folderIcon from '@/public/assets/icons/Folder.png'
import messageIcon from '@/public/assets/icons/Messages.png'
import notes from '@/public/assets/icons/Notes.png'
import photoIcon from '@/public/assets/icons/Photos.png'
import safari from '@/public/assets/icons/Safari.png'
import settings from '@/public/assets/icons/Settings.png'
import terminalIcon from '@/public/assets/icons/Terminal.png'
import trashEmpty from '@/public/assets/icons/TrashEmpty.png'
import trashFull from '@/public/assets/icons/TrashFull.png'
import Image from 'next/image'

export default function AppTray() {
  const folders = useSelector((state) => state.windowFrame)
  const minimizeFolders = folders.filter(
    (folder) => folder.status !== 'close' && folder.placement === 'desktop'
  )
  const dispatch = useDispatch()
  const taskbarApps = folders.filter((f) => f.placement === 'taskbar')
  const trashItems = useSelector((state) => state.trash.items).length

  return (
    <div className="pointer-events-auto rounded-xl bg-white/20 p-1 px-2 backdrop-blur">
      <div className="flex items-center gap-2 pb-[5px]">
        <button className="relative size-14">
          <Image
            alt=""
            src={finder}
            fill
            className="object-cover object-center"
          />
        </button>
        <button className="relative size-14">
          <Image
            alt=""
            src={messageIcon}
            fill
            className="object-cover object-center"
          />
        </button>
        <button className="relative size-14">
          <Image
            alt=""
            src={contactIcon}
            fill
            className="object-cover object-center"
          />
        </button>
        {taskbarApps.map((folder) => (
          <button
            className="group relative size-14"
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
              <Image
                alt=""
                src={settings}
                fill
                className="object-cover object-center"
              />
            )}
            {folder.type === 'folder' && folder.id === 'gallery' && (
              <Image
                alt=""
                src={photoIcon}
                fill
                className="object-cover object-center"
              />
            )}
            {folder.type === 'folder' && folder.id === 'trash' && (
              <Image
                alt=""
                src={trashItems > 0 ? trashFull : trashEmpty}
                fill
                className="object-cover object-center"
              />
            )}
            {folder.type === 'folder' && folder.id === 'inotes' && (
              <Image
                alt=""
                src={notes}
                fill
                className="object-cover object-center"
              />
            )}
            {folder.type === 'folder' && folder.id === 'terminal' && (
              <Image
                alt=""
                src={terminalIcon}
                fill
                className="object-cover object-center"
              />
            )}
            {folder.type === 'browser' && (
              <Image
                alt=""
                src={safari}
                fill
                className="object-cover object-center"
              />
            )}
            {folder.type === 'calculator' && (
              <Image
                alt="calculator"
                src={calculator}
                fill
                className="object-cover object-center"
              />
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
            className="group relative size-14"
            onClick={() => {
              if (folder.status === 'open') return
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
              <Image
                alt=""
                src={folderIcon}
                fill
                className="object-cover object-center"
              />
            )}
            {folder.type === 'pdf' && (
              <Image
                alt="pdf"
                // className="p-[4px]"
                src={acrobat}
                fill
                className="object-cover object-center"
              />
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
