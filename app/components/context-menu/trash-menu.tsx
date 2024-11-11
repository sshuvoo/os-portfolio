import { cleanTrash, removeFromTrash } from '@/app/features/trash'
import { restoreFolder, restoreFolderAll } from '@/app/features/window-slice'
import { useDispatch, useSelector } from '@/app/store'
import { Folder } from '../folder/folders'

export function TrashContextMenu({
  position,
  item,
}: {
  item: Folder
  position: { x: number; y: number }
}) {
  const dispatch = useDispatch()
  const trashItems = useSelector((state) => state.trash.items)
  return (
    <div
      style={{
        top: position.y,
        left: position.x,
      }}
      onContextMenu={(e) => {
        e.stopPropagation()
      }}
      className="absolute z-[9999] w-52 rounded-md bg-dark-context-bg text-sm shadow-2xl"
    >
      <ul className="space-y-1 p-2 [&>li:hover]:bg-[#222222] [&>li]:rounded-md [&>li]:p-[3px] [&>li]:px-2 [&>li]:text-[#e0e0e0]">
        <li className="relative !mb-2 !text-[#888888] after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-full after:bg-[#5a5a5a] after:content-['']">
          Open
        </li>
        <li
          onClick={() => {
            dispatch(restoreFolder(item))
            dispatch(removeFromTrash({ id: item.id, name: item.name }))
          }}
          className="relative !mb-2 after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-full after:bg-[#5a5a5a] after:content-['']"
        >
          Put Back
        </li>
        <li
          onClick={() => {
            if (trashItems.length > 1) {
              dispatch(restoreFolderAll(trashItems))
              dispatch(cleanTrash())
            }
          }}
          className={`relative !mb-2 after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-full after:bg-[#5a5a5a] after:content-[''] ${trashItems.length <= 1 ? '!text-[#888888]' : ''}`}
        >
          Put Back All
        </li>
        <li
          onClick={() => {
            dispatch(removeFromTrash({ id: item.id, name: item.name }))
          }}
        >
          Delete Immediately
        </li>
        <li
          onClick={() => {
            dispatch(cleanTrash())
          }}
        >
          Empty Trash
        </li>
        <li className="!text-[#888888]">Get Info</li>
        <li className="!text-[#888888]">Copy</li>
      </ul>
    </div>
  )
}
