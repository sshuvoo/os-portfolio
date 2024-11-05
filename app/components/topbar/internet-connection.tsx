'use client'

import { useEffect, useState } from 'react'
import { FaWifi } from 'react-icons/fa'
import { MdOutlineWifiOff } from 'react-icons/md'

export function InternetConnection() {
  const [status, setStatus] = useState<'online' | 'offline'>('online')

  useEffect(() => {
    const connection = (event: Event) => {
      if (event.type === 'online') setStatus('online')
      if (event.type === 'offline') setStatus('offline')
    }
    window.addEventListener('online', connection)
    window.addEventListener('offline', connection)
    return () => {
      window.removeEventListener('online', connection)
      window.removeEventListener('offline', connection)
    }
  }, [])

  return (
    <div>
      {status === 'online' ? (
        <FaWifi className="text-base text-green-500" />
      ) : (
        <MdOutlineWifiOff className="text-base text-red-500" />
      )}
    </div>
  )
}
