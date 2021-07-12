import { createSlice } from '@reduxjs/toolkit'

export const powdersSlice = createSlice({
  name: 'readPowders',
  initialState: [],
  reducers: {
    markPowderRead: {
      reducer(state, action) {
        if (!state.find((id) => id === action.payload)) {
          state.push(action.payload)
        }
      },
    },
  },
})

export const { actions, reducer } = powdersSlice

export const { markPowderRead } = actions

export default reducer
