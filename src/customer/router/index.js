import React, { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import CustomerPart from '../components/CustomerPart'
import CustomerParts from '../components/CustomerParts'
import MyOrders from '../components/MyOrders'
import PrivateRoute from '../../shared/PrivateRoute'
import { useAuth0 } from '@auth0/auth0-react'

const Routing = () => {
  const { isAuthenticated, isLoading, loginWithRedirect, user } = useAuth0()

  useEffect(() => {
    if (!isAuthenticated && !isLoading && !user) {
      loginWithRedirect()
    } else {
      console.log('Authenticated!')
    }
  }, [isAuthenticated, isLoading, user, loginWithRedirect])

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/app/customer-parts" />} />
      <Route
        path="/app/my-orders"
        element={<PrivateRoute component={MyOrders} />}
      />
      <Route
        path="/app/my-orders/:orderId"
        element={<PrivateRoute component={MyOrders} />}
      />
      <Route
        path="/app/customer-part/:partId"
        element={<PrivateRoute component={CustomerPart} />}
      />
      <Route
        path="/app/customer-parts"
        element={<PrivateRoute component={CustomerParts} />}
      />
    </Routes>
  )
}

export default Routing
