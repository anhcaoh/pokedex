import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface __templateNameToPascalCase__State {
  value: number
}

const initialState: __templateNameToPascalCase__State = {
  value: 0,
}

export const __templateNameToPascalCase__Slice = createSlice({
  name: '__templateNameToPascalCase__',
  initialState,
  reducers: {
    increment: (state) => {
      //INFO: not actually mutating state here. Immer is at work
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = __templateNameToPascalCase__Slice.actions

export default __templateNameToPascalCase__Slice.reducer