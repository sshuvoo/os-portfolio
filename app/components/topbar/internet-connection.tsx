'use client'

import { IconWifi, IconWifiOff } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

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
        <IconWifi className='size-5 text-green-500' stroke={2} />
      ) : (
        <IconWifiOff className='size-5 text-red-500' stroke={2} />
      )}
    </div>
  )
}
