import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { groupBy } from 'lodash'

import { upsertLabTest } from './labTestsSlice'
import { upsertOrder } from './ordersSlice'
import { upsertPowder } from './powdersSlice'
import { PromiseStateFactory } from './utils'
import Api from '../utils/vitalamApi'

const getLatestToken = async ({ getState }) => {
  const id = await Api()
    .latestToken()
    .then((res) => res.id)
  const last = getState()?.tokens?.last

  if (id === last?.id)
    return {
      last,
      latestToken: last,
    }

  return {
    latestToken: await Api().tokenById(id),
    last,
  }
}

const getRefToken = async (token, position, tokens = []) => {
  const isRef = token.metadata.type === 'REFERENCE'
  // 1. api fails to return token with id 0, so setting first as ref
  // 2. so if ref token found, then return and carry on fetching in getData fn
  return token.id === 1 || position + 1 === token.id || isRef
    ? {
        ref: isRef ? token : tokens.ref || undefined,
        data: [...tokens, token],
        newPosition: token.id + tokens.length,
      }
    : await getRefToken(
        // TODO get all ids, and then await in parallel
        await Api().tokenById(token.id - 1),
        position,
        [...tokens, token]
      )
}

const getData = async (last = { id: 1 }, tokens = {}, position) => {
  if (!position || last.id > position) {
    const { newPosition, data, ref } = await getRefToken(last, position)

    if (ref) {
      // TODO
      // clear all tokens before ref
      // set new ref and persist, maybe a new reducer
    }

    return await getData(
      last,
      { ...tokens, data: [...data, ...(tokens?.data || [])] },
      newPosition
    )
  }

  if (position < last.id) {
    const newToken = await Api().tokenById(position + 1)
    const updatedTokens = { ...tokens, data: [...tokens.data, newToken] }

    return await getData(last, updatedTokens, position + 1)
  }

  return { ...tokens, last }
}

// this is a helper function to temporarly address current setup
// only new tokens will call upsert actions
const upsertTokens = (tokens, dispatch) => {
  const { ORDER, LAB_TEST, POWDER } = groupBy(tokens, 'metadata.type')
  // TODO comeup with a nicer way so they can be rendered one by one while loading
  if (ORDER) ORDER.map((token) => dispatch(upsertOrder(token)))
  if (POWDER) POWDER.map((token) => dispatch(upsertPowder(token)))
  if (LAB_TEST) LAB_TEST.map((token) => dispatch(upsertLabTest(token)))
}

// this thunk is for fetching new tokens and storing to localstorage
const fetchTokens = createAsyncThunk('tokens/fetch', async (action, store) => {
  try {
    const { latestToken, last } = await getLatestToken(store)
    const tokens = store.getState().tokens || {}
    const newData = await getData(latestToken, {}, last?.id, store)
    // upsert only new tokens
    upsertTokens(newData.data, store.dispatch)
    return {
      ...newData,
      data: [...(newData?.data || []), ...tokens.data],
    }
  } catch (e) {
    console.error(e)
  }
})

// init fn that reads localstorage and sorts tokens by order/powder/etc
const initTokens = createAsyncThunk('tokens/init', async (action, store) => {
  try {
    const { tokens } = store.getState()
    const { latestToken, last } = await getLatestToken(store, tokens)
    const res = await getData(latestToken, tokens, last?.id)

    upsertTokens(res.data, store.dispatch)

    return {
      ...tokens,
      ...res,
      data: res.ref
        ? res.data.filter((token) => token.id > res.ref.id)
        : res.data,
    }
  } catch (e) {
    console.error(e)
  }
})

const tokens = createSlice({
  name: 'tokens',
  initialState: { isFetching: true, isError: false, data: [] },
  reducers: {
    addRef: {
      reducer(state, { payload }) {
        const { id } = payload
        // TODO add middleware for clearing orders
        return {
          ...state,
          ref: payload,
          data: [...state.data, payload].filter((token) => token.id > id),
        }
      },
    },
    update: {
      reducer(state, { payload }) {
        state = {
          ...state,
          ...payload,
          data: [...state.data, ...(payload.data || [])],
        }
      },
    },
  },
  extraReducers: (builder) => {
    PromiseStateFactory.forEach((addCase) => addCase(builder, initTokens))
    PromiseStateFactory.forEach((addCase) => addCase(builder, fetchTokens))
  },
})

// exports
const { actions, reducer } = tokens
const { update, addRef } = actions

export { initTokens, fetchTokens, update, addRef, upsertTokens }

export default reducer
