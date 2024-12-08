import { createSlice } from '@reduxjs/toolkit'

export interface SettingsState {
  darkMode: boolean
  text: string
}

const initialState: SettingsState = {
  darkMode: false,
  text: ''
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode
    },
    writeSomething(state, actions) {
      state.text = actions.payload
    },
    resetSettings() {
      return initialState
    }
  }
})

export const {
  toggleDarkMode,
  resetSettings,
  writeSomething
} = settingsSlice.actions

export default settingsSlice.reducer
