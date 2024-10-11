'use client'

import { openFolder } from '@/app/features/window-slice'
import { useDispatch, useSelector } from '@/app/store'
import { IconFolderUp } from '@tabler/icons-react'
import Image from 'next/image'
import finder from '@/public/assets/icons/finder.svg'
import messageIcon from '@/public/assets/icons/Messages.svg'
import contactIcon from '@/public/assets/icons/Contacts.svg'
import photoIcon from '@/public/assets/icons/Photos.svg'
import reminderIcon from '@/public/assets/icons/Reminders.svg'

export default function AppTray() {
  const folders = useSelector((state) => state.windowFrame)
  const minimizeFolders = folders.filter((folder) => folder.status !== 'close')
  const dispatch = useDispatch()

  return (
    <div>
      <div className="flex items-center gap-2">
        <button>
          <Image alt="" src={finder} width={44} height={44} />
        </button>
        <input
          type="text"
          placeholder="Search"
          className="rounded-2xl border-2 border-[#191919] bg-[#1d1d1d] px-3 py-[5px] text-sm focus:border-[#858585] focus:outline-none"
        />
        <Image alt="" src={messageIcon} width={44} height={44} />
        <Image alt="" src={contactIcon} width={44} height={44} />
        <Image alt="" src={photoIcon} width={44} height={44} />
        <Image alt="" src={reminderIcon} width={44} height={44} />
        {minimizeFolders.map((folder) => (
          <button
            className="group relative"
            onClick={() => {
              dispatch(openFolder(folder.id))
            }}
            key={folder.id}
          >
            <IconFolderUp className="size-11 text-orange-400" stroke={1.2} />
            <span className="absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded bg-[#3e3e3e] px-3 py-1 shadow-md group-hover:inline-block">
              {folder.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
