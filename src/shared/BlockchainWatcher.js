import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { upsertOrder } from '../features/ordersSlice'
import { upsertPowder } from '../features/powdersSlice'
import { upsertLabTest } from '../features/labTestsSlice'

import { useApi, tokenTypes } from '../utils'

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
        lastProcessedId.current = current
      } catch (e) {
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
