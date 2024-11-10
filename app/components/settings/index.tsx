import { IconGalaxy } from '@tabler/icons-react'
import { useState } from 'react'
import { Wallpaper } from './wallpaper'
import { FiSearch } from 'react-icons/fi'
import author from '@/public/assets/images/author.jpg'
import Image from 'next/image'
import { sidebarData } from './sidebar-data'

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
        <div className="my-4 grid grid-cols-[auto,1fr] items-center gap-3 font-medium text-[#c6c6c6]">
          <div className="size-10">
            <Image alt="" src={author} className="size-full rounded-full" />
          </div>
          <div className="flex flex-col justify-center leading-snug">
            <h2>S Shuvo</h2>
            <p className="text-xs">Apple Account</p>
          </div>
        </div>
        <div className="mt-2 space-y-2">
          {sidebarData.map((item) => (
            <button
              key={item.id}
              className={`menuItem flex w-full items-center gap-2 rounded-md px-2 py-1 ${false ? 'bg-[#383838]' : 'hover:bg-[#383838]'}`}
            >
              <item.Icon className="size-5 text-emerald-500" />
              <h2 className="font-medium text-[#c6c6c6]">{item.label}</h2>
            </button>
          ))}
          <button
            onClick={() => {
              setTab('walpaper')
            }}
            className={`menuItem flex w-full items-center gap-2 rounded-md px-2 py-1 ${tab === 'walpaper' ? 'bg-[#383838]' : 'hover:bg-[#383838]'}`}
          >
            <IconGalaxy stroke={2} className="size-5 text-emerald-500" />
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
