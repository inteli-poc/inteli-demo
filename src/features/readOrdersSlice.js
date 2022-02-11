import { createSlice } from '@reduxjs/toolkit'

export const ordersSlice = createSlice({
    name: 'readOrders',
    initialState: [],
    reducers: {
        markOrderRead: {
            reducer(state, action) {
                if (!state.find((id) => id === action.payload)) {
                    state.push(action.payload)
                }
            },
        },
    },
})

export const { actions, reducer } = ordersSlice

export const { markOrderRead } = actions

export default reducer
