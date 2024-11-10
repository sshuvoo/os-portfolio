import { configureStore } from '@reduxjs/toolkit'
import { useDispatch as Dispatch, useSelector as Selector } from 'react-redux'
import { frameReducer } from '../features/window-slice'
import { terminalReducer } from '../features/terminal'
import { chromeReducer } from '../features/chrome'
import { settingsReducer } from '../features/settings'
import { notesReducer } from '../features/notes'
import { trashReducer } from '../features/trash'

export const store = configureStore({
  reducer: {
    windowFrame: frameReducer,
    terminal: terminalReducer,
    chrome: chromeReducer,
    settings: settingsReducer,
    iNotes: notesReducer,
    trash: trashReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useDispatch = Dispatch.withTypes<AppDispatch>()
export const useSelector = Selector.withTypes<RootState>()
