import AppTray from './app-tray'

export function Taskbar() {
  return (
    <div className="fixed bottom-2 left-1/2 flex w-full -translate-x-1/2 items-center justify-center text-[#e6e6e6] pointer-events-none">
      <AppTray />
    </div>
  )
}
