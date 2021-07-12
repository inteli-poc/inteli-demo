import { createSlice } from '@reduxjs/toolkit'

export const ordersSlice = createSlice({
  name: 'powders',
  initialState: [],
  reducers: {
    upsertPowder: {
      reducer(state, action) {
        const order = state.find(({ id }) => id === action.payload.id)
        if (!order) {
          state.push(action.payload)
        } else {
          Object.assign(order, action.payload)
        }
      },
    },
  },
})

export const { actions, reducer } = ordersSlice

export const { upsertPowder } = actions

export default reducer
