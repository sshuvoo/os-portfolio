import { cleanTrash } from '@/app/features/trash'
import { useDispatch, useSelector } from '@/app/store'
import { sidebarFav } from './sidebar-favourites'
import { TrashFolder } from './trash-folder'

export function TrashBin() {
  const trashItems = useSelector((state) => state.trash.items)
  const dispatch = useDispatch()

  return (
    <div className="grid h-full grid-cols-[250px,1fr]">
      <div className="bg-light-foreground dark:bg-dark-foreground h-full p-4">
        <h3 className="text-sm font-medium text-[#9a9a9a]">Favourites</h3>
        <div className="mt-2 space-y-1">
          {sidebarFav.map((f) => (
            <button
              key={f.id}
              className={`menuItem flex w-full items-center gap-2 rounded-md px-2 py-1 ${false ? 'dark:bg-dark-hover-bg' : 'dark:hover:bg-dark-hover-bg hover:bg-white'}`}
            >
              <div className="bg-primary flex size-5 items-center justify-center rounded-md">
                <f.Icon className="text-white" />
              </div>
              <h2 className="font-medium">{f.label}</h2>
            </button>
          ))}
        </div>
      </div>
      <div className="bg-light-background dark:bg-dark-background p-4">
        <div className="border-light-border dark:border-dark-border mb-2 flex items-center justify-between border-b pb-2 text-sm font-medium">
          <h2>Trash</h2>
          <button
            disabled={trashItems.length === 0}
            onClick={() => {
              dispatch(cleanTrash())
            }}
            className="rounded bg-primary text-white px-3 py-[2px] disabled:bg-gray-500"
          >
            Empty
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          {trashItems.map((item) => (
            <TrashFolder key={item.name + item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
