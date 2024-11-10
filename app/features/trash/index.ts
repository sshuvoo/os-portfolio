import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Folder } from '@/app/components/folder/folders'

interface InitialState {
  items: Folder[]
}

const initialState: InitialState = {
  items: [],
}

const trashSlice = createSlice({
  name: 'trash',
  initialState,
  reducers: {
    addToTrash: (state, actions: PayloadAction<Folder>) => {
      state.items.push(actions.payload)
    },
    removeFromTrash: (
      state,
      actions: PayloadAction<{ id: string; name: string }>
    ) => {
      state.items = state.items.filter(
        (f) => f.name !== actions.payload.name && f.id !== actions.payload.id
      )
    },
    cleanTrash: (state) => {
      state.items = []
    },
  },
})

export const { addToTrash, cleanTrash, removeFromTrash } = trashSlice.actions
export const trashReducer = trashSlice.reducer
