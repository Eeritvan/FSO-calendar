import { create } from 'zustand'

export interface SettingsState {
  darkMode: boolean
  text: string
  toggleDarkMode: () => void
  writeSomething: (text: string) => void
  resetSettings: () => void
}

const initialState:
  Omit<SettingsState, 'toggleDarkMode' | 'writeSomething' | 'resetSettings'> = {
    darkMode: false,
    text: ''
  }

const useSettingsSlice = create<SettingsState>()((set) => ({
  ...initialState,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  writeSomething: (text: string) => set({ text }),
  resetSettings: () => set(() => ({ ...initialState }))
}))

export default useSettingsSlice
