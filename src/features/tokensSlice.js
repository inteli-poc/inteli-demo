import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { groupBy } from 'lodash'

import { upsertLabTest } from './labTestsSlice'
import { upsertOrder } from './ordersSlice' 
import { upsertPowder } from './powdersSlice' 
import { PromiseStateFactory } from './utils'
import Api from '../utils/vitalamApi'

const getLatestToken = async ({ getState }, returnVal = null) => {
  const id = await Api().latestToken().then(res => res.id)
  const last = getState()?.tokens?.last
  if (id === last?.id) return returnVal

  return {
    latestToken: await Api().tokenById(id),
    last,
  }
}

const getRefToken = async (token, position, tokens = []) => {
  // api fails to return token with id 0, so setting first as ref
  console.log('checking if this token is ref: ', { token, position, tokens })
  return token.id == 1 || position + 1 == token.id || token.ref
    ? {
        ref: token.ref ? token : undefined,
        data: [ ...tokens, token],
        newPosition: token.id + tokens.length,
      }
    : await getRefToken(
        // TODO get all ids, and then await in parallel
        await Api().tokenById(token.id - 1),
        position,
        [...tokens, token]
      )
}

const getData = async (last = { id: 0 }, tokens = {}, position = undefined) => {
  if (!position || last.id > position) {
    const { newPosition, data, ...rest } = await getRefToken(last, position)
    return await getData(last, { ...tokens, ...rest, data: [...data, ...tokens?.data || []] }, newPosition)
  }

  return position < last.id
    ? await getData(last, {
        ...tokens,
        // TODO get all ids, and then await in parallel
        data: [...tokens.data, await Api().tokenById(position + 1)],
      }, position + 1)
    : { ...tokens, last }
}

// a temp solution
const upsertTokens = (tokens, dispatch) => {
  console.log(tokens, dispatch)
    const { ORDER, LAB_TEST, POWDER} = groupBy(tokens, 'metadata.type');
    if (ORDER) ORDER.map(token => dispatch(upsertOrder(token)))
    if (POWDER) POWDER.map(token => dispatch(upsertPowder(token)))
    if (LAB_TEST) LAB_TEST.map(token => dispatch(upsertLabTest(token)))
}

const fetchTokens = createAsyncThunk('tokens/fetch', async(action, store) => {
  try {
    const { latestToken, last } = getLatestToken(store)
    return await getData(latestToken, null, last?.id)
  } catch(e) {
    console.log(e)
  }
})

const initTokens = createAsyncThunk('tokens/init', async (action, store) => {
  try {
    const { tokens } = store.getItem()
    const { latestToken, last } = getLatestToken(store, tokens)
    const res = await getData(latestToken, tokens, last?.id)
    upsertTokens(res.data, store.dispatch)

    return {
      ...tokens,
      ...res,
    }
  } catch (e) {
    // implement logging <bunyan or smt>
    // include dispatch along app arg
    console.log(e)
  }
})

// Then, handle actions in your reducers:
const tokens = createSlice({
  name: 'tokens',
  initialState: { isFetching: false, isError: false, data: [] },
  reducers: {
    update: { 
      reducer(state, { payload }) {
        console.log('debug: <update reducer> ', { state, payload })
        return {
          ...state,
          ...payload,
          data: [ ...state.data, ...payload.data ]
        }
      }
    },
  },
  extraReducers: (builder) => {
    PromiseStateFactory.forEach((addCase) => addCase(builder, initTokens))
    PromiseStateFactory.forEach((addCase) => addCase(builder, fetchTokens))
  },
})

const { actions, reducer } = tokens;
const { update, clear } = actions

export { initTokens, update, clear, upsertTokens, fetchTokens}

// TODO rename to tokens...
export default reducer
