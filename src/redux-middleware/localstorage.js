import { update, upsertTokens } from '../features/tokensSlice'

/*
    at the moment localstorage middleware is more like a helper function
    once reducer have been updated sort this so it just persists and reads
*/
const getCachedTokens = ({ dispatch }) => {
    console.log('debug: ', 'checking local storage for cached tokens')
    const tokens = readFromLocalStorage('tokens')

    if (tokens?.data) {
        dispatch(update(tokens));
        upsertTokens(tokens.data, dispatch)
    }
}

const readFromLocalStorage = (key) => {
    console.log('debug: ', `reading [${key}] from local storage`)
    const item = localStorage.getItem(key)

    return item ? JSON.parse(item) : null;
}

const putToLocalStorage = (key, data) => {
    if (!data) throw new Error(`can not persist [${data}] to local storage`)
    console.log('debug: ', `saving [${key}] to local storage`, { data })
    const existing = localStorage.getItem(key) || undefined
    console.log('debug: <existing> ', { existing, data })

    return existing
        ? localStorage.setItem(key, JSON.stringify({ ...JSON.parse(existing), ...data }))
        : localStorage.setItem(key, JSON.stringify(data))
}

const localstorage = (store) => (next) => (action) => {
    const { type, payload } = action;

    try {
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
                putToLocalStorage('tokens', payload)
                upsertTokens(payload.data, store.dispatch)
                store.dispatch(update(payload))
                return next(action)
            }
            default: return next(action)
        }
    } catch(e) {
        console.log('debug: ', e)
        return next(action)
    }

}

export default localstorage