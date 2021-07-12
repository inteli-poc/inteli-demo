import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'

export const ordersSlice = createSlice({
  name: 'customerOrders',
  initialState: [],
  reducers: {
    addOrder: {
      reducer(state, action) {
        const order = state.find(({ id }) => id === action.payload.id)
        if (!order) {
          state.push(action.payload)
        }
      },
      prepare(payload) {
        const dateTime = moment(new Date()).utc()

        payload.date = dateTime.format('DD MM yyyy')
        payload.time = dateTime.format('hh:mm')

        return { payload }
      },
    },
    updateOrder: {
      reducer(state, action) {
        const order = state.find(({ id }) => id === action.payload.id)
        if (order) {
          Object.assign(order, action.payload)
        } else {
          console.error(`Error cannot find token with id ${action.payload.id}`)
        }
      },
    },
  },
})

export const { actions, reducer } = ordersSlice

export const { addOrder, updateOrder } = actions

export default reducer
