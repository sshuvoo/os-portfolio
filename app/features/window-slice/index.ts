import { Folder, folders } from '@/app/components/folder/folders'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FolderControler extends Folder {
  onMinimizeRestore?: () => void
}

const initialState: FolderControler[] = folders

const windowSlice = createSlice({
  name: 'window-frame',
  initialState,
  reducers: {
    openFolder: (state, action: PayloadAction<string>) => {
      const folder = state.find((f) => f.id === action.payload)
      if (folder) {
        folder.status = 'open'
      }
    },
    closeFolder: (state, action: PayloadAction<string>) => {
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
    addFolder: (state, action: PayloadAction<Folder>) => {
      let uniqueName = action.payload.name
      let index = 1
      while (1) {
        uniqueName = action.payload.name + '-' + index++
        const folder = state.find((f) => f.name === uniqueName)
        if (!folder) break
      }
      state.push({
        ...action.payload,
        name: uniqueName,
      })
    },
    restoreFolder: (state, action: PayloadAction<Folder>) => {
      state.push(action.payload)
    },
    restoreFolderAll: (state, action: PayloadAction<Folder[]>) => {
      state.push(...action.payload)
    },
    copyFolder: (state, action: PayloadAction<Folder>) => {
      let uniqueName = action.payload.name + '-copy1'
      let index = 1
      while (1) {
        const folder = state.find((f) => f.name === uniqueName)
        if (!folder) break
        else {
          uniqueName = action.payload.name + '-copy' + index++
        }
      }
      state.push({ ...action.payload, name: uniqueName })
    },
    deleteFolder: (state, action: PayloadAction<string>) => {
      return state.filter((f) => f.name !== action.payload)
    },
    renameFolder: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      const folder = state.find((f) => f.name === action.payload.name)
      if (!folder) {
        return state.map((f) => {
          if (f.id === action.payload.id) {
            return { ...f, name: action.payload.name }
          } else return f
        })
      }
    },
  },
})

export const {
  openFolder,
  closeFolder,
  minimizeFolder,
  addFolder,
  copyFolder,
  deleteFolder,
  renameFolder,
  restoreFolder,
  restoreFolderAll
} = windowSlice.actions
export const frameReducer = windowSlice.reducer
