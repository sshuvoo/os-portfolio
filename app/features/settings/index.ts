import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StaticImageData } from 'next/image'

interface Wallpaper {
  dark: StaticImageData
  light: StaticImageData
}

interface InitialState {
  wallpaper: Wallpaper | null
  screen: 'fullscreen' | 'default'
  brightness: number
  volume: number
  music_status: 'playing' | 'paused'
}

const initialState: InitialState = {
  wallpaper: null,
  screen: 'default',
  brightness: 100,
  volume: 50,
  music_status: 'paused',
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setWallpaper: (state, actions: PayloadAction<Wallpaper>) => {
      state.wallpaper = actions.payload
    },
    setScreenMode: (
      state,
      actions: PayloadAction<'fullscreen' | 'default'>
    ) => {
      state.screen = actions.payload
    },
    setBrightness: (state, actions: PayloadAction<number>) => {
      state.brightness = actions.payload
    },
    setVolume: (state, actions: PayloadAction<number>) => {
      state.volume = actions.payload
    },
    setMusicStatus: (state, actions: PayloadAction<'playing' | 'paused'>) => {
      state.music_status = actions.payload
    },
  },
})

export const {
  setWallpaper,
  setScreenMode,
  setBrightness,
  setVolume,
  setMusicStatus,
} = settingsSlice.actions
export const settingsReducer = settingsSlice.reducer
