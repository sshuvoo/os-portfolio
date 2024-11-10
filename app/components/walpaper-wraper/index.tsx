'use client'

import { useSelector } from '@/app/store'
import { useTheme } from 'next-themes'
import Image from 'next/image'

export function WalpaperProvider() {
  const wallpaper = useSelector((state) => state.settings.wallpaper)
  const { theme } = useTheme()

  return (
    <div className="pointer-events-none fixed inset-0 -z-50">
      {wallpaper && (
        <Image
          fill
          src={theme === 'dark' ? wallpaper.dark : wallpaper.light}
          className="object-cover object-center"
          alt=""
        />
      )}
    </div>
  )
}
