import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type Scene = 'year' | 'month' | 'week' | 'day'

export interface MainViewState {
  scene: Scene
  setScene: (scene: Scene) => void
}

const initialState: Omit<MainViewState, 'setScene'> = {
  scene: 'month'
}

const usePanelSizeSlice = create<MainViewState>()(devtools((set) => ({
  ...initialState,
  setScene: (scene) => set({ scene })
})))

export default usePanelSizeSlice
