import { createSlice } from "@reduxjs/toolkit"

export const sortingSlice = createSlice({
  name: "sorting",
  initialState: {
    array: [6, 1, 9, 7, 8, 5, 3, 4, 10, 2],
    length: 10,
  },
  reducers: {
    increment: (state) => {
      state.length += 1
    },
    decrement: (state) => {
      if (state.length <= 1) return
      state.length -= 1
    },
    updateLengthToValue: (state, action) => {
      state.length = action.payload
    },
    updateArray: (state, action) => {
      state.array = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, updateLengthToValue, updateArray } = sortingSlice.actions

export default sortingSlice.reducer
