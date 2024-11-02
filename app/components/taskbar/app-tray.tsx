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
import acrobat from '@/public/assets/icons/Acrobat.svg'
import chrome from '@/public/assets/icons/Chrome.svg'
import calculator from '@/public/assets/icons/calculator.png'

export default function AppTray() {
  const folders = useSelector((state) => state.windowFrame)
  const minimizeFolders = folders.filter(
    (folder) => folder.status !== 'close' && folder.placement === 'desktop'
  )
  const terminal = folders.find((folder) => folder.id === 'terminal')
  const dispatch = useDispatch()

  return (
    <div className="rounded-xl bg-white/20 p-1 px-2 backdrop-blur">
      <div className="flex items-center gap-2 pb-[5px]">
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
            className="size-11 fill-black text-[#ddd]"
            stroke={1.2}
          />
          <span className="absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded bg-[#3e3e3e] px-3 py-1 text-xs shadow-md group-hover:inline-block">
            Terminal
          </span>
          {(terminal?.status === 'open' || terminal?.status === 'minimize') && (
            <span className="absolute -bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-green-400"></span>
          )}
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
                <Image alt="pdf" src={chrome} width={35} height={35} />
              </div>
            )}
            {folder.type === 'calculator' && (
              <div className="flex size-11 items-center justify-center">
                <Image alt="calculator" src={calculator} width={44} height={44} />
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
