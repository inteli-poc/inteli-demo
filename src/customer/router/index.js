import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import CustomerPart from '../components/CustomerPart'
import CustomerParts from '../components/CustomerParts'
import MyOrders from '../components/MyOrders'

import { withAuthenticationRequired } from '@auth0/auth0-react'

// const redirectMsg = () => <div>Redirecting you to the login page...</div>

import { useAuth0 } from '@auth0/auth0-react'

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0()

  return <button onClick={() => loginWithRedirect()}>Log In</button>
}

const Index = () => {
  const { isAuthenticated } = useAuth0()
  let navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/app/customer-parts')
      return null
    }
  })

  return (
    <div>
      <LoginButton />
    </div>
  )
}

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route
        path="/app/my-orders"
        element={withAuthenticationRequired(MyOrders, {})}
      />
      <Route
        path="/app/my-orders/:orderId"
        element={withAuthenticationRequired(MyOrders, {})}
      />
      <Route
        path="/app/customer-part/:partId"
        element={withAuthenticationRequired(CustomerPart, {})}
      />
      <Route
        path="/app/customer-parts"
        element={withAuthenticationRequired(CustomerParts, {})}
      />
    </Routes>
  )
}

export default Routing
