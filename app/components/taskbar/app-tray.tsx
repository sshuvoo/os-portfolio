'use client'

import { setZIndex } from '@/app/features/settings'
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
import { IconBrandGithub } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import typingMaterIcon from '@/public/assets/icons/typing-master.png'

export default function AppTray() {
  const folders = useSelector((state) => state.windowFrame)
  const minimizeFolders = folders.filter(
    (folder) => folder.status !== 'close' && folder.placement === 'desktop'
  )
  const dispatch = useDispatch()
  const taskbarApps = folders.filter((f) => f.placement === 'taskbar')
  const trashItems = useSelector((state) => state.trash.items).length
  const { zIndex } = useSelector((state) => state.settings)

  return (
    <div className="pointer-events-auto rounded-xl bg-white/20 p-1 px-2 backdrop-blur">
      <div className="flex items-center gap-2 pb-[5px]">
        <button className="relative size-14">
          <Image
            alt=""
            src={finder}
            fill
            sizes="56px"
            className="object-cover object-center"
          />
        </button>
        <button className="relative size-14">
          <Image
            alt=""
            src={messageIcon}
            fill
            sizes="56px"
            className="object-cover object-center"
          />
        </button>
        {taskbarApps.map((folder) => (
          <button
            className="group relative size-14"
            onClick={() => {
              if (folder.status === 'open') dispatch(minimizeFolder(folder.id))
              else {
                dispatch(setZIndex(zIndex + 1))
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
                sizes="56px"
                className="object-cover object-center"
              />
            )}
            {folder.type === 'folder' && folder.id === 'contact' && (
              <Image
                alt=""
                src={contactIcon}
                fill
                sizes="56px"
                className="object-cover object-center"
              />
            )}
            {folder.type === 'folder' && folder.id === 'gallery' && (
              <Image
                alt=""
                src={photoIcon}
                fill
                sizes="56px"
                className="object-cover object-center"
              />
            )}
            {folder.type === 'folder' && folder.id === 'trash' && (
              <Image
                alt=""
                src={trashItems > 0 ? trashFull : trashEmpty}
                fill
                sizes="56px"
                className="object-cover object-center"
              />
            )}
            {folder.type === 'folder' && folder.id === 'inotes' && (
              <Image
                alt=""
                src={notes}
                fill
                sizes="56px"
                className="object-cover object-center"
              />
            )}
            {folder.type === 'folder' && folder.id === 'terminal' && (
              <Image
                alt=""
                src={terminalIcon}
                fill
                sizes="56px"
                className="object-cover object-center"
              />
            )}
            {folder.type === 'browser' && (
              <Image
                alt=""
                src={safari}
                fill
                sizes="56px"
                className="object-cover object-center"
              />
            )}
            {folder.type === 'calculator' && (
              <Image
                alt="calculator"
                src={calculator}
                fill
                sizes="56px"
                className="object-cover object-center"
              />
            )}
            <span className="absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded bg-[#3e3e3e] px-3 py-1 text-xs shadow-md group-hover:inline-block">
              {folder.name}
            </span>
            {(folder.status === 'open' || folder.status === 'minimize') && (
              <span className="absolute -bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-black dark:bg-white"></span>
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
            {folder.type === 'folder' && folder.id === 'typing-master' ? (
              <Image
                alt=""
                src={typingMaterIcon}
                fill
                sizes="56px"
                className="object-cover object-center p-[6px]"
              />
            ) : folder.type === 'pdf' ? (
              <Image
                alt="pdf"
                src={acrobat}
                fill
                sizes="56px"
                className="object-cover object-center p-[6px]"
              />
            ) : (
              <Image
                alt=""
                src={folderIcon}
                fill
                sizes="56px"
                className="object-cover object-center"
              />
            )}
            <span className="absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded bg-[#3e3e3e] px-3 py-1 text-xs shadow-md group-hover:inline-block">
              {folder.name}
            </span>
            <span className="absolute -bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-black dark:bg-white"></span>
          </button>
        ))}
        <Link
          target="_blank"
          href="https://github.com/sshuvoo/os-portfolio"
          className="group relative flex size-[45px] items-center justify-center rounded-md bg-dark-background"
        >
          <IconBrandGithub stroke={1} className="size-10 text-dark-text" />
          <span className="absolute -top-9 left-1/2 hidden -translate-x-1/2 rounded bg-[#3e3e3e] px-3 py-1 text-xs shadow-md group-hover:inline-block">
            Github
          </span>
        </Link>
      </div>
    </div>
  )
}
