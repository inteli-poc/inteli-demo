import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import { upsertOrder } from '../features/ordersSlice'
// import { upsertPowder } from '../features/powdersSlice'
// import { upsertLabTest } from '../features/labTestsSlice'
// import { fetchTokens } from '../features/tokensSlice'
import { useApi } from '../utils'

// so metadata files that are svg images can be displayed, change from default MIME of 'application/octet-stream'
/*
const svgMimeUrl = async (imageUrl) => {
  const response = await fetch(imageUrl)
  const oldBlob = await response.blob()
  const blob = new Blob([oldBlob], { type: 'image/svg+xml' })
  return URL.createObjectURL(blob)
}
*/

/*
// TODO should be an action and called when state init
const getStartToken = async () => {
  // read from local storage
  // if nothing - find start token
  // if no start found it should keep all the tokens and render from 0
}
*/
// temporary version of the component that will poll the API
const BlockchainWatcher = ({ children }) => {
  const dispatch = useDispatch()
  const isFetching = useSelector((state) => state.tokens.isFetching)
  // orders, powders pull from redux state
  // these will change and cause a re-render when we dispatch a change in the effect
  // const tokens = useSelector((state) => state.app.tokens)
  const api = useApi()

  // This effect manages the polling for new tokens
  useEffect(() => {
    // will store the timeout id. This will be set for the first time lower down
    // note when this is null it means the timer has been cancelled which is caused
    // by a component render
    let timer = undefined
    // poll the blockchain. If after the pollFunc the timer has not been set to null
    // we should continue to loop. This is the general behaviour if there are no new tokens
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
    // kick off the timer immediately. This is important so that we can deal with multiple new tokens
    // quickly. Each new token from the blockchain will cause a redux state change that will require
    // that this effect be reset. Therefore to keep the loop going without delay this call should occur
    // straight away
    timer = setTimeout(timerFn, 3000)

    // The clean-up function clears the timer (as expected) but also sets it to null to indicate to the
    // `pollFunc` that this specific effect instantiation has been canceled
    return () => {
      clearTimeout(timer)
      timer = null
    }
  }, [dispatch, api]) // effect sensitivities.
  // These will force the effect to be canceled when redux state changes

  return <>{children}</>
}

export default BlockchainWatcher
