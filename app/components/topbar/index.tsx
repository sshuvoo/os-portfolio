import { FaApple } from 'react-icons/fa'
import { IoIosBatteryFull } from 'react-icons/io'
import { IoSearch } from 'react-icons/io5'
import { TaskbarClock } from '../taskbar/clock'
import { Weather } from '../taskbar/weather'
import { ControlCenter } from './control-center'
import { InternetConnection } from './internet-connection'

export function Topbar() {
  return (
    <div className="flex h-7 justify-between bg-white/15 px-4 text-sm text-white backdrop-blur">
      <div className="flex items-center gap-4">
        <FaApple className="text-lg" />
        <button>Finder</button>
        <button>File</button>
        <button>Edit</button>
        <button>View</button>
        <button>Go</button>
        <button>Window</button>
        <button>Help</button>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-4">
          <IoIosBatteryFull className="text-xl" />
          <InternetConnection />
          <IoSearch className="text-base" />
          <ControlCenter className="size-4" />
        </div>
        <Weather />
        <TaskbarClock />
      </div>
    </div>
  )
}
