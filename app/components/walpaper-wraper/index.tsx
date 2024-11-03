'use client'

import { useSelector } from '@/app/store'
import Image from 'next/image'

export function WalpaperProvider() {
  const current = useSelector((state) => state.settings.current)

  return (
    <div className="fixed inset-0">
      <Image fill src={current} className="object-cover object-center" alt="" />
    </div>
  )
}
