import { IconType } from 'react-icons'
import { GrAppleAppStore } from 'react-icons/gr'
import { IoMdWifi } from 'react-icons/io'
import {
  IoFolderOutline,
  IoLaptopOutline,
  IoSettingsOutline,
} from 'react-icons/io5'
import { MdDownloading } from 'react-icons/md'

interface SidebarFav {
  id: number
  label: string
  Icon: IconType
}

export const sidebarFav: SidebarFav[] = [
  {
    id: 1,
    label: 'Recent In Documents',
    Icon: IoSettingsOutline,
  },
  {
    id: 2,
    label: 'AirDrop',
    Icon: IoMdWifi,
  },
  {
    id: 3,
    label: 'Applications',
    Icon: GrAppleAppStore,
  },
  {
    id: 4,
    label: 'Desktop',
    Icon: IoLaptopOutline,
  },
  {
    id: 5,
    label: 'Downloads',
    Icon: MdDownloading,
  },
  {
    id: 6,
    label: 'On My Mac',
    Icon: IoFolderOutline,
  },
]
