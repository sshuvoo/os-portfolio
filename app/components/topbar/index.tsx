import { TaskbarClock } from '../taskbar/clock'
import { Weather } from '../taskbar/weather'
import { InternetConnection } from './internet-connection'

export function Topbar() {
  return (
    <div className="flex justify-between bg-white/15 px-4 text-[#dbdbdb] backdrop-blur">
      <div></div>
      <div className="flex items-center gap-2">
        <InternetConnection />
        <Weather />
        <TaskbarClock />
      </div>
    </div>
  )
}
