import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchTokens, initTokens } from '../features/tokensSlice'
// import createRefToken from '../utils/resetChain'

// so metadata files that are JSON can be used, change from default MIME of 'application/octet-stream'
const toJSON = async (url) => {
  const response = await fetch(url)
  return response.json()
}

// temporary version of the component that will poll the API
const BlockchainWatcher = ({ children }) => {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = React.useState(false)
  const { isFetching } = useSelector((state) => state.tokens)

  // This effect manages the polling for new tokens
  // TODO refactor chain watcher
  useEffect(() => {
    // createRefToken('resetTest-2', dispatch)
    if (!isLoaded) {
      dispatch(initTokens())
      setIsLoaded(true)
      console.log('finished loading state from local storage')
    } else {
      // will store the timeout id. This will be set for the first time lower down
      // note when this is null it means the timer has been cancelled which is caused
      // by a component render
      const timerFn = async () => {
        try {
          if (!isFetching) {
            dispatch(fetchTokens())
          }
<<<<<<< HEAD
        } catch (err) {
          console.error(
            `Error polling for blockchain state. Error was ${
              `"${err.message}"` || JSON.stringify(err, null, 2)
            }`
          )
=======

          if (
            token.metadata.type === tokenTypes.order &&
            token.metadata.requiredCerts
          ) {
            token.metadata.requiredCerts = await toJSON(
              token.metadata.requiredCerts.url
            )
          }

          // if state has been modified and the effect canceled bail. The re-render will
          // generate the effect again with the correct state context. Note nothing asynchronous
          // should follow this point in the loop
          if (timer === null) {
            return
          }

          // Handle each token based on type
          switch (token.metadata.type) {
            case tokenTypes.order: {
              dispatch(
                upsertOrder({
                  id: token.id,
                  original_id: token.original_id,
                  roles: token.roles,
                  metadata: token.metadata,
                  timeStamp: token.timestamp,
                })
              )
              break
            }
            case tokenTypes.powder:
              dispatch(
                upsertPowder({
                  id: token.id,
                  original_id: token.original_id,
                  roles: token.roles,
                  metadata: token.metadata,
                })
              )
              break
            case tokenTypes.powderTest:
              dispatch(
                upsertLabTest({
                  id: token.id,
                  original_id: token.original_id,
                  roles: token.roles,
                  metadata: token.metadata,
                })
              )
              break
            default:
              console.error(`Unknown token type ${token.metadata.type}`)
          }
          // update the `lastProcessedId` now we've processed the token
          lastProcessedId.current = i
>>>>>>> main
        }
      }
      const timer = setTimeout(timerFn, 13000)

      // The clean-up function clears the timer (as expected) but also sets it to null to indicate to the
      // `pollFunc` that this specific effect instantiation has been canceled
      return () => {
        clearTimeout(timer)
      }
    }
  }, [dispatch, isFetching]) // effect sensitivities.

  return <>{children}</>
}

export default BlockchainWatcher
