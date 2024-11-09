import { IconType } from 'react-icons'
import { FaBluetoothB, FaWifi } from 'react-icons/fa'
import { IoMdWifi } from 'react-icons/io'

interface Connection {
  id: number
  label: string
  value: string
  Icon: IconType
}

export const connections: Connection[] = [
  {
    id: 1,
    label: 'Wi-Fi',
    value: 'No Internet',
    Icon: FaWifi,
  },
  {
    id: 2,
    label: 'Bluetooth',
    value: 'On',
    Icon: FaBluetoothB,
  },
  {
    id: 3,
    label: 'AirDrop',
    value: 'Everyone',
    Icon: IoMdWifi,
  },
]
