import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import CustomerPart from '../components/CustomerPart'
import CustomerParts from '../components/CustomerParts'
import MyOrders from '../components/MyOrders'

const Routing = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/app/customer-parts" />
      <Route exact path="/app/my-orders" component={MyOrders} />
      <Route exact path="/app/customer-part/:partId" component={CustomerPart} />
      <Route exact path="/app/customer-parts" component={CustomerParts} />
    </Switch>
  )
}

export default Routing
