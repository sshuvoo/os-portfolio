import { IconChevronRight } from '@tabler/icons-react'

export default function Test() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="relative w-56 rounded-md border-2 border-[#e1e1e1] bg-[#f3f3f3] p-2 shadow-xl">
        <span className="absolute -top-[9px] left-5 block size-4 rotate-45 rounded-tl border-l-2 border-t-2 border-[#e1e1e1] bg-[#f3f3f3]" />
        <h2 className="text-sm font-medium text-[#afafaf]">Move & Resize</h2>
        <div className="grid grid-cols-4 items-center gap-5 p-4">
          <button className="flex h-5 justify-start rounded border-2 border-dark-background p-[1px]">
            <div className="h-full w-1/2 rounded-sm bg-dark-background"></div>
          </button>
          <button className="flex h-5 justify-end rounded border-2 border-dark-background p-[1px]">
            <div className="h-full w-1/2 rounded-sm bg-dark-background"></div>
          </button>
          <button className="flex h-5 items-end rounded border-2 border-dark-background p-[1px]">
            <div className="h-1/2 w-full rounded-sm bg-dark-background"></div>
          </button>
          <button className="flex h-5 items-start rounded border-2 border-dark-background p-[1px]">
            <div className="h-1/2 w-full rounded-sm bg-dark-background"></div>
          </button>
        </div>
        <div className="mb-1 h-[1px] bg-[#bbb]" />
        <div>
          <button className="flex w-full items-center justify-between rounded-md bg-primary px-2 py-[2px] text-sm text-white">
            <span>Full Screen</span>
            <IconChevronRight stroke={2} className="size-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
