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
  activeApp: {
    name: string
  } | null
  zIndex: number
  desktop: {
    view: 'vertical' | 'horizontal'
    sort: 'date' | 'name'
  }
}

const initialState: InitialState = {
  wallpaper: null,
  screen: 'default',
  brightness: 100,
  volume: 50,
  music_status: 'paused',
  activeApp: null,
  zIndex: 1024,
  desktop: {
    view: 'vertical',
    sort: 'date',
  },
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
    setActiveApp: (state, actions: PayloadAction<{ name: string } | null>) => {
      if (actions.payload) {
        state.activeApp = actions.payload
      } else state.activeApp = null
    },
    setZIndex: (state, actions: PayloadAction<number>) => {
      state.zIndex = actions.payload
    },
    setViewOption: (
      state,
      actions: PayloadAction<'vertical' | 'horizontal'>
    ) => {
      state.desktop.view = actions.payload
    },
    setSortOption: (state, actions: PayloadAction<'date' | 'name'>) => {
      state.desktop.sort = actions.payload
    },
  },
})

export const {
  setWallpaper,
  setScreenMode,
  setBrightness,
  setVolume,
  setMusicStatus,
  setActiveApp,
  setZIndex,
  setViewOption,
  setSortOption,
} = settingsSlice.actions
export const settingsReducer = settingsSlice.reducer
