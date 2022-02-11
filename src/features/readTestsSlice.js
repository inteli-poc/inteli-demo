import { createSlice } from '@reduxjs/toolkit'

export const ordersSlice = createSlice({
    name: 'readTests',
    initialState: [],
    reducers: {
        markTestRead: {
            reducer(state, action) {
                if (!state.find((id) => id === action.payload)) {
                    state.push(action.payload)
                }
            },
        },
    },
})

export const { actions, reducer } = ordersSlice

export const { markTestRead } = actions

export default reducer
