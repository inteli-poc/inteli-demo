import { createSlice } from '@reduxjs/toolkit'

export const labTestsSlice = createSlice({
  name: 'labTests',
  initialState: [],
  reducers: {
    addLabTest: {
      reducer(state, action) {
        const labTest = state.find(({ id }) => id === action.payload.id)
        if (!labTest) {
          state.push(action.payload)
        }
      },
    },
    updateLabTest: {
      reducer(state, action) {
        const test = state.find(({ id }) => id === action.payload.id)
        if (test) {
          Object.assign(test, action.payload)
        } else {
          console.error(`Error cannot find token with id ${action.payload.id}`)
        }
      },
    },
  },
})

export const { actions, reducer } = labTestsSlice

export const { addLabTest, updateLabTest } = actions

export default reducer
