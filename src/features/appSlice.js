import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PromiseStateFactory } from './utils'
import Api from '../utils/vitalamApi'

const getRefToken = async (token, tokens = []) => {
    const prevId = token.id - 1 // this is fragile, but hoping for an update soon 
    return (!prevId|| token.ref) ? {
        ref: token,
        tokens,
        position: token.id + tokens.length,
    } : await getRefToken(
        // TODO get all ids, and then await in parallel
        await Api().tokenById(prevId), [
            ...tokens,
            token,
        ])
}

const getData = async (last, position = false, data = {}) => {
    if (!last) return Promise.reject('unable to retrieve last token')
    // return a ref token along with the checked tokens so client can catch up if needed
    if (!position) {
        const { position, ...tokens } = await getRefToken(last)
        return await getData(last, position, tokens)
    }

    // caching up if needed
    return position <= last.id
        ? await getData(last, position + 1, {
              ...data,
              // TODO get all ids, and then await in parallel
              tokens: [...data.tokens, await Api().tokenById(position + 1)],
          })
        : { last, ...data }
}

const loadAppState = createAsyncThunk('app/init', async (app = {}) => {
    try {
        return {
            ...app,
            data: await getData(await Api().latestToken(), app.data),
        }
    } catch(e) {
        // implement logging <bunyan or smt>
        console.log(e)
    }
});

// Then, handle actions in your reducers:
const app = createSlice({
    name: 'app',
    initialState: { isFetching: false, isError: false },
    reducers: {
        __update: (args) => console.log(args),
        __clear: (args) => console.log(args),
    },
    extraReducers: (builder) => {
        PromiseStateFactory.forEach((addCase) => addCase(builder, loadAppState))
    }
})

export { loadAppState }

export default app.reducer
