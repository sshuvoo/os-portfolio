import { cleanTrash } from '@/app/features/trash'
import { useDispatch, useSelector } from '@/app/store'
import { sidebarFav } from './sidebar-favourites'
import { TrashFolder } from './trash-folder'

export function TrashBin() {
  const trashItems = useSelector((state) => state.trash.items)
  const dispatch = useDispatch()

  return (
    <div className="grid h-full grid-cols-[250px,1fr]">
      <div className="h-full bg-[#282828] p-4">
        <h3 className="text-sm font-medium text-[#9a9a9a]">Favourites</h3>
        <div className="mt-2 space-y-2">
          {sidebarFav.map((f) => (
            <button
              key={f.id}
              className={`grid w-full grid-cols-[auto,1fr] items-center gap-2 rounded-md px-2 py-1 ${false ? 'bg-[#383838]' : 'hover:bg-[#383838]'}`}
            >
              <div className="flex size-5 items-center justify-center">
                <f.Icon className="size-full text-emerald-500" />
              </div>
              <h2 className="line-clamp-1 text-start text-sm font-medium text-[#c6c6c6]">
                {f.label}
              </h2>
            </button>
          ))}
        </div>
      </div>
      <div className="bg-[#212121] p-4">
        <div className="mb-2 flex items-center justify-between border-b border-[#414141] pb-2 text-sm font-medium text-[#dedede]">
          <h2>Trash</h2>
          <button
            disabled={trashItems.length === 0}
            onClick={() => {
              dispatch(cleanTrash())
            }}
            className="rounded bg-[#1564D9] px-3 py-[2px] disabled:bg-gray-500"
          >
            Empty
          </button>
        </div>
        <div className="flex flex-wrap gap-4 text-[#dadada]">
          {trashItems.map((item) => (
            <TrashFolder key={item.name + item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
