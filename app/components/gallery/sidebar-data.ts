import { IconType } from 'react-icons'
import {
  FaRegClock,
  FaRegHeart,
  FaUnsplash,
  FaUserCircle,
} from 'react-icons/fa'
import { IoLocationOutline } from 'react-icons/io5'
import { MdPhotoLibrary } from 'react-icons/md'

interface SidebarData {
  id: string
  label: string
  Icon: IconType
}

export const sidebarData: SidebarData[] = [
  {
    id: 'unsplash',
    label: 'Unsplash',
    Icon: FaUnsplash,
  },
  {
    id: 'library',
    label: 'Library',
    Icon: MdPhotoLibrary,
  },
  {
    id: 'people',
    label: 'People',
    Icon: FaUserCircle,
  },
  {
    id: 'places',
    label: 'Places',
    Icon: IoLocationOutline,
  },
  {
    id: 'favourites',
    label: 'favourites',
    Icon: FaRegHeart,
  },
  {
    id: 'recents',
    label: 'Recents',
    Icon: FaRegClock,
  },
]
