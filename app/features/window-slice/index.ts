import { Folder, folders } from '@/app/components/folder/folders'
import { createSlice } from '@reduxjs/toolkit'

export interface FolderControler extends Folder {
  onMinimizeRestore?: () => void
}

const initialState: FolderControler[] = folders

const windowSlice = createSlice({
  name: 'window-frame',
  initialState,
  reducers: {
    openFolder: (state, action) => {
      const folder = state.find((f) => f.id === action.payload)
      if (folder) {
        folder.status = 'open'
      }
    },
    closeFolder: (state, action) => {
      const folder = state.find((f) => f.id === action.payload)
      if (folder) {
        folder.status = 'close'
      }
    },
    minimizeFolder: (state, action) => {
      const folder = state.find((f) => f.id === action.payload.id)
      if (folder) {
        folder.status = 'minimize'
        folder.onMinimizeRestore = action.payload.onRestore
      }
    },
  },
})

export const { openFolder, closeFolder, minimizeFolder } = windowSlice.actions
export const frameReducer = windowSlice.reducer
