import { update, upsertTokens } from '../features/tokensSlice'

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
// TODO ideally should just read and persist store, but for time being will do
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