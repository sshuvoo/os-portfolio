import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface BrowserTab {
  id: string
  url: string
  title: string
  iframe_url: string
}

const uuid = crypto.randomUUID()

const initialState: { tabs: BrowserTab[]; focusedTab: string } = {
  tabs: [
    {
      id: uuid,
      title: 'New Tab',
      url: '',
      iframe_url: '',
    },
  ],
  focusedTab: uuid,
}

const chromeSlice = createSlice({
  name: 'chrome',
  initialState,
  reducers: {
    addNewtab: (state) => {
      if (state.tabs.length < 4) {
        const newid = crypto.randomUUID()
        state.tabs.push({
          id: newid,
          title: 'New Tab',
          url: '',
          iframe_url: '',
        })
        state.focusedTab = newid
      }
    },
    removeTab: (state, action: PayloadAction<string>) => {
      if (state.tabs.length >= 2) {
        state.tabs = state.tabs.filter((tab) => tab.id !== action.payload)
        state.focusedTab = state.tabs[state.tabs.length - 1].id
      }
    },
    focusTab: (state, action: PayloadAction<string>) => {
      state.focusedTab = action.payload
    },
    updateTab: (state, action: PayloadAction<string>) => {
      const tab = state.tabs.find((tab) => tab.id === state.focusedTab)
      if (tab) tab.url = action.payload
    },
    resetChrome: (state) => {
      const id = crypto.randomUUID()
      state.focusedTab = id
      state.tabs = [
        {
          id: uuid,
          title: 'New Tab',
          url: '',
          iframe_url: '',
        },
      ]
    },
  },
})

export const { addNewtab, removeTab, focusTab, resetChrome, updateTab } =
  chromeSlice.actions
export const chromeReducer = chromeSlice.reducer
