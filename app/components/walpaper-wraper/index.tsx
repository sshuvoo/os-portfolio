'use client'

import { useSelector } from '@/app/store'
import Image from 'next/image'

export function WalpaperProvider() {
  const current = useSelector((state) => state.settings.current)

  return (
    <div className="pointer-events-none fixed inset-0 -z-50">
      <Image fill src={current} className="object-cover object-center" alt="" />
    </div>
  )
}
