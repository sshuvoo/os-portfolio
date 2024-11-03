import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import md from '@/public/assets/background/monterey-dark.jpg'
import { StaticImageData } from 'next/image'

const initialState = {
  current: md,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setWallpaper: (state, actions: PayloadAction<StaticImageData>) => {
      state.current = actions.payload
    },
  },
})

export const { setWallpaper } = settingsSlice.actions
export const settingsReducer = settingsSlice.reducer
