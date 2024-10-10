'use client'

import { openFolder } from '@/app/features/window-slice'
import { useDispatch, useSelector } from '@/app/store'
import { IconBrandFinder } from '@tabler/icons-react'
import { IconFolderUp } from '@tabler/icons-react'

export default function AppTray() {
  const folders = useSelector((state) => state.windowFrame)
  const minimizeFolders = folders.filter((folder) => folder.status !== 'close')
  const dispatch = useDispatch()

  return (
    <div>
      <div className="flex items-center gap-2">
        <button>
          <IconBrandFinder
            className="size-11 fill-sky-500 text-black"
            stroke={1}
          />
        </button>
        <input
          type="text"
          placeholder="Search"
          className="rounded-2xl border-2 border-[#191919] bg-[#1d1d1d] px-3 py-[5px] text-sm focus:border-[#858585] focus:outline-none"
        />
        {minimizeFolders.map((folder) => (
          <button
            onClick={() => {
              dispatch(openFolder(folder.id))
            }}
            key={folder.id}
          >
            <IconFolderUp className="size-11 text-orange-400" stroke={1.2} />
          </button>
        ))}
      </div>
    </div>
  )
}
