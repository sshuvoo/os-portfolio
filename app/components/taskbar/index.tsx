import AppTray from './app-tray'

export function Taskbar() {
  return (
    <div className="fixed bottom-2 left-1/2 flex w-full -translate-x-1/2 items-center justify-center rounded-xl bg-white/20 p-1 px-2 text-[#e6e6e6] backdrop-blur md:w-fit">
      <AppTray />
    </div>
  )
}
