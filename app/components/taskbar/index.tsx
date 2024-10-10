import AppTray from './app-tray'
import { TaskbarClock } from './clock'
import { Weather } from './weather'

export function Taskbar() {
  return (
    <div className="fixed bottom-2 left-1/2 flex -translate-x-1/2 items-center justify-between rounded-xl bg-white/20 backdrop-blur p-1 text-[#e6e6e6]">
      <Weather />
      <AppTray />
      <TaskbarClock />
    </div>
  )
}
