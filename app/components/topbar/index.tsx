import { FaApple } from 'react-icons/fa'
import { TaskbarClock } from '../taskbar/clock'
import { Weather } from '../taskbar/weather'
import { InternetConnection } from './internet-connection'

export function Topbar() {
  return (
    <div className="flex h-7 justify-between bg-white/15 px-4 text-sm text-white backdrop-blur">
      <div className="flex items-center gap-2">
        <FaApple className="text-lg" />
      </div>
      <div className="flex items-center gap-2">
        <InternetConnection />
        <Weather />
        <TaskbarClock />
      </div>
    </div>
  )
}
