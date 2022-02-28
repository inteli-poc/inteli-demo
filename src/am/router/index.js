import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import Orders from '../components/Orders'
import { Powders, PowdersDetails } from '../components/Powders'
import Tests from '../components/Tests'
import PrivateRoute from '../../shared/PrivateRoute'

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/app/orders" />} />
      <Route path="/app/orders" element={<PrivateRoute component={Orders} />} />
      <Route
        path="/app/orders/:orderId"
        element={<PrivateRoute component={Orders} />}
      />
      <Route
        path="/app/powders"
        element={<PrivateRoute component={Powders} />}
      />
      <Route
        path="/app/powders/:powderId"
        element={<PrivateRoute component={PowdersDetails} />}
      />
      <Route path="/app/tests" element={<PrivateRoute component={Tests} />} />
      <Route
        path="/app/tests/:testId"
        element={<PrivateRoute component={Tests} />}
      />
    </Routes>
  )
}

export default Routing
