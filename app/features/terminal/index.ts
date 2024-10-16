import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { commands } from './terminal-commands'
import { folders } from '@/app/components/folder/folders'

export interface TerminalHistory {
  id: string
  command: string
  error: string | null
  console?: string
  mode: 'directory' | 'node'
}

export interface TerminalState {
  mode: 'directory' | 'node'
  history: TerminalHistory[]
}

const initialState: TerminalState = {
  mode: 'directory',
  history: [],
}

const terminalSlice = createSlice({
  name: 'terminal',
  initialState,
  reducers: {
    runPrompt: (state, action: PayloadAction<string>) => {
      if (state.mode === 'directory') {
        if (action.payload === 'node') {
          state.mode = 'node'
          state.history.push({
            id: crypto.randomUUID(),
            command: action.payload,
            error: null,
            mode: 'directory',
          })
        } else if (
          commands.includes(action.payload) ||
          action.payload.startsWith('cd ') ||
          action.payload.startsWith('cat ')
        ) {
          if (action.payload === 'clear' || action.payload === 'exit') {
            state.history = []
          } else if (
            action.payload === 'cd' ||
            action.payload.startsWith('cd ')
          ) {
            state.history.push({
              id: crypto.randomUUID(),
              command: action.payload,
              error: "You can't change directory due to Author's restriction",
              mode: 'directory',
            })
          } else if (
            action.payload === 'cat' ||
            action.payload.startsWith('cat ')
          ) {
            const directory = action.payload.split(' ')[1]
            if (directory) {
              const isFound = folders.find(
                ({ id }) => id === directory.toLowerCase()
              )
              if (!isFound) {
                state.history.push({
                  id: crypto.randomUUID(),
                  command: action.payload,
                  error: `The following directory "${directory}" is not found`,
                  mode: 'directory',
                })
              } else {
                state.history.push({
                  id: crypto.randomUUID(),
                  command: action.payload,
                  error: null,
                  mode: 'directory',
                })
              }
            } else {
              state.history.push({
                id: crypto.randomUUID(),
                command: action.payload,
                error: `Invalid command prompt, try > cat <directory_name>`,
                mode: 'directory',
              })
            }
          } else {
            state.history.push({
              id: crypto.randomUUID(),
              command: action.payload,
              error: null,
              mode: 'directory',
            })
          }
        } else if (action.payload !== '') {
          state.history.push({
            id: crypto.randomUUID(),
            command: action.payload,
            error: `The term "${action.payload}" is not recognized as a name of a cmdlet, type "help" to get available commands.`,
            mode: 'directory',
          })
        } else
          state.history.push({
            id: crypto.randomUUID(),
            command: action.payload,
            error: null,
            mode: 'directory',
          })
      } else if (state.mode === 'node') {
        if (action.payload === 'exit') {
          state.mode = 'directory'
          state.history.push({
            id: crypto.randomUUID(),
            command: action.payload,
            error: null,
            mode: 'node',
          })
        } else if (action.payload === 'clear') {
          state.history = []
        }
      }
    },
    runNode: (
      state,
      action: PayloadAction<{ console: string; error: string; command: string }>
    ) => {
      state.history.push({
        id: crypto.randomUUID(),
        command: action.payload.command,
        mode: 'node',
        error: action.payload.error,
        console: action.payload.console,
      })
    },
  },
})

export const { runPrompt, runNode } = terminalSlice.actions
export const terminalReducer = terminalSlice.reducer
