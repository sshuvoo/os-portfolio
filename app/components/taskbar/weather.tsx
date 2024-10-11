'use client'

import { getCurrentConditions } from '@/app/actions/weather'
import { useEffect, useState } from 'react'
import { weatherCodeMapping } from './weather-text'

export function Weather() {
  const [condition, setCondition] = useState<{
    WeatherText: string
    Temperature: number
  }>()

  useEffect(() => {
    let ignore = false
    navigator.geolocation.getCurrentPosition(async (position) => {
      const res = await getCurrentConditions({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      })

      if (res && !ignore) {
        setCondition({
          WeatherText:
            weatherCodeMapping[res.current.weatherCode] || 'Unknown Condition',
          Temperature: res.current.temperature2m,
        })
      }
    })
    return () => {
      ignore = true
    }
  }, [])

  return (
    <div className="px-4 text-xs font-medium">
      <p>{condition && condition.Temperature.toFixed(1) + ' °C'}</p>
      <p>{condition && condition.WeatherText}</p>
    </div>
  )
}
