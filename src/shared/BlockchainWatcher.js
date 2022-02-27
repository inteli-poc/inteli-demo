import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { upsertOrder } from '../features/ordersSlice'
import { upsertPowder } from '../features/powdersSlice'
import { upsertLabTest } from '../features/labTestsSlice'

import { useApi, tokenTypes } from '../utils'

/*
  TODO
  - update vitalamApi to handle svg and json files
  - find a solution for expired urls
*/
/*
// so metadata files that are svg images can be displayed, change from default MIME of 'application/octet-stream'
const svgMimeUrl = async (imageUrl) => {
  const response = await fetch(imageUrl)
  const oldBlob = await response.blob()
  const blob = new Blob([oldBlob], { type: 'image/svg+xml' })
  return URL.createObjectURL(blob)
}

// TODO gain more understanding on this
// there might be a better way to changing type rather than maing two async calls
// so metadata files that are JSON can be used, change from default MIME of 'application/octet-stream'
const toJSON = async (url) => {
  const response = await fetch(url)
  return response.json()
}
*/

// temporary version of the component that will poll the API
const BlockchainWatcher = ({ children }) => {
  const dispatch = useDispatch()
  const lastProcessedId = useRef(0)
  const api = useApi()

  const upsertToken = (token, type) => { 
    if (tokenTypes.order === type) dispatch(upsertOrder(token))
    if (tokenTypes.powder === type) dispatch(upsertPowder(token))
    if (tokenTypes.labTests === type) dispatch(upsertLabTest(token))
  }

  // This effect manages the polling for new tokens
  useEffect(() => {
    const pollFn = async (current = 1) => {
      try {
        const latestId = await api.latestToken().then((res) => res.id)
        if (current < latestId) {
          const token = await api.tokenById(current)
          upsertToken(token)
          // returning without await because then it will be fetched in parallel'is
          // tokens needs to be fetched in series as currently we have no way to identify the missing tokens
          return pollFn(current + 1)
        }
        dispatch(updateNetworkStatus(true)) // TODO this should be handled by the vitalamApi hook
        lastProcessedId.current = current
      } catch (e) {
        dispatch(updateNetworkStatus(false)) // TODO this should be handled by the vitalamApi hook
        console.error('Error occured while fetching tokens: ', e)
      }
    }
    const timer = setTimeout(() => pollFn(lastProcessedId.current), 3323)

    return () => {
      clearTimeout(timer)
    }
  }, [dispatch, api])

  return <>{children}</>
}

export default BlockchainWatcher
