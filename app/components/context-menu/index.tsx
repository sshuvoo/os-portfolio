import { setZIndex } from '@/app/features/settings'
import { addFolder, openFolder } from '@/app/features/window-slice'
import { useDispatch, useSelector } from '@/app/store'
import { IoIosArrowForward } from 'react-icons/io'

export function ContextMenu({
  position,
}: {
  position: { x: number; y: number }
}) {
  const dispatch = useDispatch()
  const { screen: screenMode, zIndex } = useSelector((state) => state.settings)

  return (
    <div
      style={{
        top: position.y,
        left: position.x,
      }}
      onContextMenu={(e) => {
        e.stopPropagation()
      }}
      className="absolute z-[9999] w-64 rounded-md bg-[#343434] text-sm shadow-2xl"
    >
      <ul className="space-y-1 p-2 [&>li:hover]:bg-[#222222] [&>li]:rounded-md [&>li]:p-[3px] [&>li]:px-2 [&>li]:text-[#e0e0e0]">
        <li
          onClick={() => {
            dispatch(
              addFolder({
                id: crypto.randomUUID(),
                name: 'Untitled',
                status: 'close',
                placement: 'desktop',
                type: 'folder',
              })
            )
          }}
          className="relative !mb-2 after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-full after:bg-[#5a5a5a] after:content-['']"
        >
          New Folder
        </li>
        <li className="relative !mb-2 !text-[#888888] after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-full after:bg-[#5a5a5a] after:content-['']">
          Get Info
        </li>
        <li className="relative !mb-2 flex items-center justify-between !text-[#888888] after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-full after:bg-[#5a5a5a] after:content-['']">
          <span>Import From Iphone</span>
          <IoIosArrowForward />
        </li>
        <li
          onClick={() => {
            dispatch(setZIndex(zIndex + 1))
            dispatch(openFolder('settings'))
          }}
        >
          Change Desktop Background
        </li>
        <li
          onClick={() => {
            if (document.fullscreenElement) {
              document.exitFullscreen()
            } else if (document.body.requestFullscreen) {
              document.body.requestFullscreen()
            }
          }}
          className="flex items-center justify-between"
        >
          <span>
            {screenMode === 'fullscreen'
              ? 'Exit Fullscreen'
              : 'Request Fullscreen'}
          </span>
          <span>F11</span>
        </li>
        <li className="flex items-center justify-between">
          <span>Sort By</span>
          <IoIosArrowForward />
        </li>
        <li className="!text-[#888888]">Clean Up</li>
        <li className="flex items-center justify-between !text-[#888888]">
          <span>Clean Up By</span>
          <IoIosArrowForward />
        </li>
        <li className="flex items-center justify-between">
          <span>Show View Options</span>
          <IoIosArrowForward />
        </li>
      </ul>
    </div>
  )
}
