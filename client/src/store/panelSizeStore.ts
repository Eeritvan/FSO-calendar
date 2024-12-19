import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface PanelSizeState {
  defaultSize: number
  expandedView: boolean
  dragging: boolean
  setDefaultSize: (leftSize: number) => void
  setExpandedView: (expandedView: boolean) => void
  setIsDragging: (dragging: boolean) => void
  resetPanelSize: () => void
}

const initialState:
  Omit<PanelSizeState,
    'setDefaultSize' |
    'setExpandedView' |
    'setIsDragging' |
    'resetPanelSize'>
  = {
    defaultSize: 10,
    expandedView: false,
    dragging: false
  }

const usePanelSizeSlice = create<PanelSizeState>()(devtools((set) => ({
  ...initialState,
  setDefaultSize: (defaultSize) => set({ defaultSize }),
  setExpandedView: (expandedView) => set({ expandedView }),
  setIsDragging: (dragging) => set({ dragging }),
  resetPanelSize: () => set(() => ({ ...initialState }))
})))

export default usePanelSizeSlice
