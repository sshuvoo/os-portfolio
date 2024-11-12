import { IconType } from 'react-icons'
import { CiGlobe } from 'react-icons/ci'
import { FaWifi } from 'react-icons/fa'
import { IoIosBatteryDead } from 'react-icons/io'
import { IoBluetooth, IoSettingsOutline } from 'react-icons/io5'
import { RxAccessibility } from 'react-icons/rx'

interface SidebarData {
  id: number
  label: string
  Icon: IconType
}

export const sidebarData: SidebarData[] = [
  {
    id: 1,
    label: 'Wi-Fi',
    Icon: FaWifi,
  },
  {
    id: 2,
    label: 'Bluetooth',
    Icon: IoBluetooth,
  },
  {
    id: 3,
    label: 'Network',
    Icon: CiGlobe,
  },
  {
    id: 4,
    label: 'Battery',
    Icon: IoIosBatteryDead,
  },
  {
    id: 5,
    label: 'General',
    Icon: IoSettingsOutline,
  },
  {
    id: 6,
    label: 'Accessibility',
    Icon: RxAccessibility,
  },
]
