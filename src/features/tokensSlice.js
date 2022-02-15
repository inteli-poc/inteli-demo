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
  console.log('debug: <getLastToken>', { id, last })
  if (id === last?.id) return returnVal

  return {
    latestToken: await Api().tokenById(id),
    last,
  }
}

// TODO rename and refactor once confirmed (should be called lookForRefTOken) or smth
const getRefToken = async (token, position, tokens = []) => {
  console.log('debuu: <getRefTooken> ', { token, position, tokens })
  // 1. api fails to return token with id 0, so setting first as ref
  // 2. so if ref token found, then return and carry on fetching in getData fn
  return token.id === 1 || position + 1 === token.id || token.type === 'REFERENCE'
    ? {
        ref: token.type === 'REFERENCE' ? token : (tokens.ref || undefined),
        data: [ ...tokens, token],
        newPosition: token.id + tokens.length,
      }
    : await getRefToken(
        // TODO get all ids, and then await in parallel
        await Api().tokenById(token.id - 1),
        position,
        [ ...tokens, token ],
      )
}

const getData = async (last = { id: 1 }, tokens = {}, position = undefined) => {
  if (!position || last.id > position) {
    const { newPosition, data, ...rest } = await getRefToken(last, position)
    return await getData(last, { ...tokens, ...rest, data: [...data, ...tokens?.data || []] }, newPosition)
  }

  // TODO should be a better way then incrementing by 1
  return position < last.id
    ? await getData(last, {
        ...tokens,
        // TODO get all ids, and then await in parallel
        data: [...tokens.data, await Api().tokenById(position + 1)],
      }, position + 1)
    : { ...tokens, last }
}

// this is a helper function to temporarly address current setup
// only new tokens will call upsert actions
const upsertTokens = (tokens, dispatch) => {
  const { ORDER, LAB_TEST, POWDER} = groupBy(tokens, 'metadata.type');
  // TODO comeup with a nicer way so they can be rendered one by one while loading
  if (ORDER) ORDER.map(token => dispatch(upsertOrder(token)))
  if (POWDER) POWDER.map(token => dispatch(upsertPowder(token)))
  if (LAB_TEST) LAB_TEST.map(token => dispatch(upsertLabTest(token)))
}

// this thunk is for fetching new tokens and storing to localstorage
const fetchTokens = createAsyncThunk('tokens/fetch', async(action, store) => {
  try {
    const { latestToken, last } = await getLatestToken(store)
    return await getData(latestToken, null, last?.id)
  } catch(e) {
    console.log(e)
  }
})

// init fn that reads localstorage and sorts tokens by order/powder/etc
const initTokens = createAsyncThunk('tokens/init', async (action, store) => {
  // TODO remove try catch once confirmed that promise factory can handle
  try {
    const { tokens } = store.getState()
    const { latestToken, last } = await getLatestToken(store, tokens)
    const res = await getData(latestToken, tokens, last?.id)

    upsertTokens(res.data, store.dispatch)

    return {
      ...tokens,
      ...res,
      data: res.ref
        ? res.data.filter(token => token.id > res.ref.id)
        : res.data
    }
  } catch (e) {
    // implement logging <bunyan or smt> // can return error for 
    console.log(e)
  }
})

// a redux slice 
const tokens = createSlice({
  name: 'tokens',
  initialState: { isFetching: false, isError: false, data: [] },
  reducers: {
    add: {
      reducer(state, { payload }) {
        return {
          ...state,
          ref: payload,
          data: [ ...state.data, payload ]
        }
      }
    },
    update: { 
      reducer(state, { payload }) {
        console.log('debug: <update reducer> ', { state, payload })
        return {
          ...state,
          ...payload,
          data: [ ...state.data, ...payload.data ] // figure out a nicer way
        }
      }
    },
  },
  extraReducers: (builder) => {
    PromiseStateFactory.forEach((addCase) => addCase(builder, initTokens))
    PromiseStateFactory.forEach((addCase) => addCase(builder, fetchTokens))
  },
})

// exports
const { actions, reducer } = tokens;
const { update, add } = actions

export {
  initTokens,
  fetchTokens,
  update,
  add,
  upsertTokens,
}

export default reducer
