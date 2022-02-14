import { update, upsertTokens } from '../features/tokensSlice'

/*
    at the moment localstorage middleware is more like a helper function
    once reducer have been updated sort this so it just persists and reads
*/
const getCachedTokens = ({ dispatch }) => {
    console.log('debug: ', 'checking local storage for cached tokens')
    const tokens = readFromLocalStorage('tokens')

    if (tokens.data) {
        dispatch(update(tokens));
        upsertTokens(tokens.data, dispatch)
    }
}

const readFromLocalStorage = (key) => {
    console.log('debug: ', `reading [${key}] to local storage`)
    const item = localStorage.getItem(key)

    return item ? JSON.parse(item) : null;
}

const putToLocalStorage = (key, data) => {
    console.log('debug: ', `saving [${key}] to local storage`)
    const existing = localStorage.getItem(key) || {}

    return existing
        ? localStorage.setItem(key, JSON.stringify({ ...existing, data: [ ...data ], last }))
        : localStorage.setItem(key, JSON.stringify(data))
}

// conditional middleware
// TODO refactor it, ideally it should have some reducers excluded and everything
// else can be persisted to local storage
const localstorage = (store) => (next) => (action) => {
    const { type, payload } = action;
    switch(type) {
        case 'tokens/init/pending': {
            getCachedTokens(store)
            return next(action)
        }
        case 'tokens/init/fulfilled': {
            putToLocalStorage('tokens', payload)
            return next(action)
        }
        case 'tokens/fetch/fulfilled': {
            if (!payload) return next(action)
            upsertTokens(payload.data, store.dispatch)
            putToLocalStorage('tokens', payload)
            store.dispatch(update(payload))
            return next(action)
        }
        default: return next(action)
    }
}

export default localstorage