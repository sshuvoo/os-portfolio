import folderBlack from '@/public/assets/icons/folder-black.svg'
import folderBlue from '@/public/assets/icons/folder-blue.svg'
import folderGray from '@/public/assets/icons/folder-gray.svg'
import folderGreen from '@/public/assets/icons/folder-green.svg'
import folderLightGreen from '@/public/assets/icons/folder-light-green.svg'
import folderOrange from '@/public/assets/icons/folder-orange.svg'
import folderPurple from '@/public/assets/icons/folder-purple.svg'
import folderRed from '@/public/assets/icons/folder-red.svg'
import folderYellow from '@/public/assets/icons/folder-yellow.svg'
import Image from 'next/image'
import { useState } from 'react'
const folders = [
  folderBlack,
  folderBlue,
  folderGray,
  folderGreen,
  folderLightGreen,
  folderOrange,
  folderPurple,
  folderRed,
  folderYellow,
]

export function RandomFolder() {
  const [randomIndex] = useState(Math.floor(Math.random() * folders.length))
  return (
    <Image alt="folder" src={folders[randomIndex]} width={60} height={60} />
  )
}
