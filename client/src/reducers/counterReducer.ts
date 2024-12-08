import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    setCounter(action) {
      return action.payload
    },
    increaseCounter(state) {
      return state + 1
    },
    decreaseCounter(state) {
      return state - 1
    },
    resetCounter() {
      return 0
    },
  },
})

export const {
  setCounter,
  increaseCounter,
  decreaseCounter,
  resetCounter
} = counterSlice.actions
export default counterSlice.reducer