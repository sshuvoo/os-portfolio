import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface INote {
  id: string
  content: string
  updatedAt: string
}

interface InitialState {
  notes: INote[]
}

const localNotes = window.localStorage.getItem('iNotes')

const parseNotes: INote[] | null = JSON.parse(localNotes || 'null')

const initialState: InitialState = {
  notes: parseNotes || [
    {
      id: crypto.randomUUID(),
      content: 'This is demo note',
      updatedAt: new Date().toISOString(),
    },
  ],
}

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNewNote: (state, actions: PayloadAction<INote>) => {
      state.notes.unshift(actions.payload)
    },
    updateNote: (state, actions: PayloadAction<INote>) => {
      state.notes = state.notes.map((note) => {
        if (note.id === actions.payload.id) {
          return {
            ...note,
            content: actions.payload.content,
            updatedAt: actions.payload.updatedAt,
          }
        } else return note
      })
    },
  },
})

export const { addNewNote, updateNote } = notesSlice.actions
export const notesReducer = notesSlice.reducer
