import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import getLastToken from './nowwhere/dot/token';

const getLastToken = () => Promise.resolve({ id: 10 })
const getTokenById = (id) => {
    if (id === 2) return Promise.resolve({ id, ref: true })
    return Promise.resolve({ id })
}

const getRefToken = async (token, tokens = []) => {
    if (token.id === 1 || token.ref)
        return {
            ref: token,
            tokens,
            position: token.id + tokens.length,
        }
    return await getRefToken(await getTokenById(token.id - 1), [
        ...tokens,
        token,
    ])
}

const getData = async (last, position = false, data = {}) => {
    // return a ref token along with the checked tokens so client can catch up if needed
    if (!position) {
        const { position, ...newData } = await getRefToken(last)
        return await getData(last, position, newData)
    }

    // caching up if needed
    return position <= last.id
        ? await getData(last, position + 1, {
              ...data,
              tokens: [...data.tokens, await getTokenById(position + 1)],
          })
        : { last, ...data }
}

export const loadAppState = createAsyncThunk('app/init', async (app = {}) => ({
    ...app,
    data: await getData(await getLastToken(), app.data),
}))

// Then, handle actions in your reducers:
const app = createSlice({
    name: 'app',
    initialState: { isFetching: false, isError: false },
    reducers: {
        update: (args) => console.log(args),
        clear: (args) => console.log(args),
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(loadAppState.fulfilled, (state, action) => {
            console.log({ state, action })
            return action.payload
        })
    },
})

// dispatch(loadAppState({}))

export default app.reducer
