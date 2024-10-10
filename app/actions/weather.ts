'use server'

import { fetchWeatherApi } from 'openmeteo'

interface LatLon {
  lat: number
  lon: number
}

export async function getCurrentConditions({ lat, lon }: LatLon) {
  try {
    const params = {
      latitude: lat,
      longitude: lon,
      current: [
        'temperature_2m',
        'relative_humidity_2m',
        'apparent_temperature',
        'is_day',
        'precipitation',
        'rain',
        'snowfall',
        'weather_code',
        'pressure_msl',
        'surface_pressure',
        'wind_speed_10m',
        'wind_direction_10m',
      ],
    }
    const url = 'https://api.open-meteo.com/v1/forecast'
    const responses = await fetchWeatherApi(url, params)
    const response = responses[0]
    const utcOffsetSeconds = response.utcOffsetSeconds()
    const current = response.current()!

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
      current: {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        temperature2m: current.variables(0)!.value(),
        relativeHumidity2m: current.variables(1)!.value(),
        apparentTemperature: current.variables(2)!.value(),
        isDay: current.variables(3)!.value(),
        precipitation: current.variables(4)!.value(),
        rain: current.variables(5)!.value(),
        snowfall: current.variables(6)!.value(),
        weatherCode: current.variables(7)!.value(),
        pressureMsl: current.variables(8)!.value(),
        surfacePressure: current.variables(9)!.value(),
        windSpeed10m: current.variables(10)!.value(),
        windDirection10m: current.variables(11)!.value(),
      },
    }
    return weatherData
  } catch (error) {
    console.log(error)
    return null
  }
}
