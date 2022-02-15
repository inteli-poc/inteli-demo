import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { initTokens } from '../features/tokensSlice'
import { fetchTokens } from '../features/tokensSlice'

// temporary version of the component that will poll the API
const BlockchainWatcher = ({ children }) => {
  const dispatch = useDispatch()
  const isFetching = useSelector((state) => state.tokens.isFetching)
  // move to middleware along with the new prop 'loaded: false' and update once don[e
  useEffect(() => {
    dispatch(initTokens())
  }, [])

  // This effect manages the polling for new tokens
  useEffect(() => {
    // will store the timeout id. This will be set for the first time lower down
    // note when this is null it means the timer has been cancelled which is caused
    // by a component render
    let timer = undefined
    const timerFn = async () => {
      try {
        if (!isFetching) {
          console.log('debug: ', 'fetching new tokens...')
          dispatch(fetchTokens())
        }
      } catch (err) {
        console.error(
          `Error polling for blockchain state. Error was ${
            `"${err.message}"` || JSON.stringify(err, null, 2)
          }`
        )
      }
    }
    timer = setTimeout(timerFn, 1000)

    // The clean-up function clears the timer (as expected) but also sets it to null to indicate to the
    // `pollFunc` that this specific effect instantiation has been canceled
    return () => {
      clearTimeout(timer)
      timer = null
    }
  }, [dispatch]) // effect sensitivities.

  return <>{children}</>
}

export default BlockchainWatcher
