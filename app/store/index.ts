import { configureStore } from '@reduxjs/toolkit'
import { useDispatch as Dispatch, useSelector as Selector } from 'react-redux'
import { frameReducer } from '../features/window-slice'
import { terminalReducer } from '../features/terminal'

export const store = configureStore({
  reducer: {
    windowFrame: frameReducer,
    terminal: terminalReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useDispatch = Dispatch.withTypes<AppDispatch>()
export const useSelector = Selector.withTypes<RootState>()
