import folderBlue from '@/public/assets/icons/Folder.png'
import Image from 'next/image'
import acrobat from '@/public/assets/icons/Acrobat.svg'
import { Frame } from './folders'

export function RandomFolder({ type }: { type: Frame }) {
  if (type === 'pdf') {
    return <Image alt="pdf" src={acrobat} width={50} height={50} />
  }
  return <Image alt="folder" src={folderBlue} width={60} height={60} />
}
