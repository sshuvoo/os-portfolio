import folderBlack from '@/public/assets/icons/folder-black.svg'
import folderBlue from '@/public/assets/icons/folder-blue.svg'
import folderGray from '@/public/assets/icons/folder-gray.svg'
import folderGreen from '@/public/assets/icons/folder-green.svg'
import folderOrange from '@/public/assets/icons/folder-orange.svg'
import folderRed from '@/public/assets/icons/folder-red.svg'
import Image from 'next/image'
import acrobat from '@/public/assets/icons/Acrobat.svg'

import { useState } from 'react'
const folders = [
  folderBlack,
  folderBlue,
  folderGray,
  folderGreen,
  folderOrange,
  folderRed,
]

export function RandomFolder({ type }: { type: 'folder' | 'pdf' }) {
  const [randomIndex] = useState(Math.floor(Math.random() * folders.length))

  if (type === 'pdf') {
    return <Image alt="pdf" src={acrobat} width={50} height={50} />
  }
  return (
    <Image alt="folder" src={folders[randomIndex]} width={60} height={60} />
  )
}
