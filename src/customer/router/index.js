import React, { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import CustomerPart from '../components/CustomerPart'
import CustomerParts from '../components/CustomerParts'
import MyOrders from '../components/MyOrders'
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react'

const Routing = () => {
  const { isAuthenticated, isLoading, loginWithRedirect, user } = useAuth0()

  useEffect(() => {
    if (!isAuthenticated && !isLoading && !user) {
      loginWithRedirect()
    } else {
      console.log('Authenticated!')
    }
  }, [isLoading, user, loginWithRedirect])

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/app/customer-parts" />} />
      <Route
        path="/app/my-orders"
        element={withAuthenticationRequired(MyOrders, {
          onRedirecting: () => <h1>Redirecting...</h1>,
        })}
      />
      <Route
        path="/app/my-orders/:orderId"
        element={withAuthenticationRequired(MyOrders, {
          onRedirecting: () => <h1>Redirecting...</h1>,
        })}
      />
      <Route
        path="/app/customer-part/:partId"
        element={withAuthenticationRequired(CustomerPart, {
          onRedirecting: () => <h1>Redirecting...</h1>,
        })}
      />
      <Route
        path="/app/customer-parts"
        element={withAuthenticationRequired(CustomerParts, {
          onRedirecting: () => <h1>Redirecting...</h1>,
        })}
      />
    </Routes>
  )
}

export default Routing
