import { IconGalaxy } from '@tabler/icons-react'
import { useState } from 'react'
import { Wallpaper } from './wallpaper'
import { FiSearch } from 'react-icons/fi'

export function Settings() {
  const [tab, setTab] = useState<'walpaper'>('walpaper')

  return (
    <div className="grid h-full grid-cols-[250px,1fr]">
      <div className="h-full bg-[#282828] p-4">
        <div className="relative mb-2 text-[#ebebeb]">
          <FiSearch className="absolute left-2 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-md bg-[#353535] px-3 py-1 pl-8 text-sm focus:border-[#858585] focus:outline-none"
          />
        </div>
        <div className="mt-2 space-y-2">
          <button
            onClick={() => {
              setTab('walpaper')
            }}
            className={`menuItem flex w-full items-center gap-2 rounded-md px-2 py-1 ${tab === 'walpaper' ? 'bg-[#383838]' : 'hover:bg-[#383838]'}`}
          >
            <IconGalaxy stroke={2} className="text-emerald-500" />
            <h2 className="font-medium text-[#c6c6c6]">Wallpaper</h2>
          </button>
        </div>
      </div>
      <div className="bg-[#212121] p-4">
        {tab === 'walpaper' && <Wallpaper />}
      </div>
    </div>
  )
}
