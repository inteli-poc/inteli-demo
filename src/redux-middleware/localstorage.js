import { update, upsertTokens } from '../features/tokensSlice'

/*
  at the moment localstorage middleware is more like a helper function
  once reducers have been updated sort this so it just persists and reads
*/
const getCachedTokens = ({ dispatch }) => {
  const tokens = readFromLocalStorage('tokens')

  if (tokens?.data) {
    dispatch(update(tokens))
    upsertTokens(tokens.data, dispatch)
  }
}

const readFromLocalStorage = (key) => {
  const item = localStorage.getItem(key)

  return item ? JSON.parse(item) : null
}

const putToLocalStorage = (key, data) => {
  if (!data) throw new Error(`can not persist [${data}] to local storage`)
  const existing = localStorage.getItem(key) || undefined

  return existing
    ? localStorage.setItem(
        key,
        JSON.stringify({ ...JSON.parse(existing), ...data })
      )
    : localStorage.setItem(key, JSON.stringify(data))
}

const localstorage = (store) => (next) => (action) => {
  const { type, payload } = action

  try {
    switch (type) {
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
        if (payload.data) {
          upsertTokens(payload.data, store.dispatch)
          store.dispatch(update(payload))
        }
        return next(action)
      }
      default:
        return next(action)
    }
  } catch (e) {
    console.error(e)
    return next(action)
  }
}

export default localstorage
