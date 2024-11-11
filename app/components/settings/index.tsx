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
    <div className="dark:text-dark-text text-light-text grid h-full grid-cols-[250px,1fr]">
      <div className="dark:bg-dark-foreground bg-light-foreground h-full p-4">
        <div className="relative mb-2">
          <FiSearch className="absolute left-2 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search"
            className="dark:bg-dark-input-bg w-full rounded-md bg-white px-3 py-1 pl-8 text-sm focus:border-[#858585] focus:outline-none"
          />
        </div>
        <div className="my-4 grid grid-cols-[auto,1fr] items-center gap-3 font-medium">
          <div className="size-10">
            <Image alt="" src={author} className="size-full rounded-full" />
          </div>
          <div className="flex flex-col justify-center leading-snug">
            <h2>S Shuvo</h2>
            <p className="text-xs">Apple Account</p>
          </div>
        </div>
        <div className="mt-2 space-y-1">
          {sidebarData.map((item) => (
            <button
              key={item.id}
              className={`menuItem flex w-full items-center gap-2 rounded-md px-2 py-1 ${false ? 'dark:bg-dark-hover-bg' : 'dark:hover:bg-dark-hover-bg hover:bg-white'}`}
            >
              <div className="bg-primary flex size-5 items-center justify-center rounded-md">
                <item.Icon className="text-white" />
              </div>
              <h2 className="font-medium">{item.label}</h2>
            </button>
          ))}
          <button
            onClick={() => {
              setTab('walpaper')
            }}
            className={`menuItem flex w-full items-center gap-2 rounded-md px-2 py-1 ${tab === 'walpaper' ? 'dark:bg-dark-hover-bg bg-white' : 'dark:hover:bg-dark-hover-bg hover:bg-white'}`}
          >
            <div className="bg-primary flex size-5 items-center justify-center rounded-md">
              <IconGalaxy stroke={2} className="text-white" />
            </div>
            <h2 className="font-medium">Wallpaper</h2>
          </button>
        </div>
      </div>
      <div className="p-4">{tab === 'walpaper' && <Wallpaper />}</div>
    </div>
  )
}
