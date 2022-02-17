import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { initTokens } from '../features/tokensSlice'
import { fetchTokens } from '../features/tokensSlice'
// import createRefToken from '../utils/resetChain'

// temporary version of the component that will poll the API
const BlockchainWatcher = ({ children }) => {
  const dispatch = useDispatch()
  const isFetching = useSelector((state) => state.tokens.isFetching)

  // will call initTokens to check if there is a new reference token
  useEffect(() => {
    // createRefToken('resetTest-2-[2', dispatch)
    dispatch(initTokens())
  }, [])

  // This effect manages the polling for new tokens
  // TODO refactor chain watcher
  useEffect(() => {
    // will store the timeout id. This will be set for the first time lower down
    // note when this is null it means the timer has been cancelled which is caused
    // by a component render
    const timerFn = async () => {
      try {
        if (!isFetching) {
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
    const timer = setTimeout(timerFn, 13000)

    // The clean-up function clears the timer (as expected) but also sets it to null to indicate to the
    // `pollFunc` that this specific effect instantiation has been canceled
    return () => {
      clearTimeout(timer)
    }
  }, [dispatch, isFetching]) // effect sensitivities.

  return <>{children}</>
}

export default BlockchainWatcher
