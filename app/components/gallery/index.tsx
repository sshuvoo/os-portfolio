import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { sidebarData } from './sidebar-data'
import { ImageGrid } from './image-grid'
import { useDebounce } from '@/app/hooks/useDebounce'

export function Gallery() {
  const [tab, setTab] = useState<string>('unsplash')
  const [query, setQuery] = useState('')

  const slowDown = useDebounce<string>((value) => {
    setQuery(value)
  }, 1)

  return (
    <div className="grid h-full grid-cols-[250px,1fr] text-light-text dark:text-dark-text">
      <div className="max-h-full overflow-y-auto bg-light-foreground p-4 dark:bg-dark-foreground">
        <div className="relative mb-2">
          <FiSearch className="absolute left-2 top-1/2 -translate-y-1/2" />
          <input
            onChange={(e) => {
              slowDown(e.target.value)
            }}
            type="text"
            placeholder="Search"
            className="w-full rounded-md bg-white px-3 py-1 pl-8 text-sm focus:border-[#858585] focus:outline-none dark:bg-dark-input-bg"
          />
        </div>
        <div className="mt-2 space-y-1">
          {sidebarData.map((item) => (
            <button
              onClick={() => {
                setTab(item.id)
              }}
              key={item.id}
              className={`menuItem flex w-full items-center gap-2 rounded-md px-2 py-1 ${tab === item.id ? 'bg-white dark:bg-dark-hover-bg' : 'hover:bg-white dark:hover:bg-dark-hover-bg'}`}
            >
              <div className="flex size-5 items-center justify-center rounded-md bg-primary">
                <item.Icon className="text-white" />
              </div>
              <h2 className="font-medium">{item.label}</h2>
            </button>
          ))}
        </div>
      </div>
      <div className="max-h-full overflow-y-auto p-4">
        <ImageGrid query={query} />
      </div>
    </div>
  )
}
