import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Orders from '../components/Orders'
import { Powders, PowdersDetails } from '../components/Powders'
import Tests from '../components/Tests'

const Routing = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/app/orders" />
      <Route exact path="/app/orders" component={Orders} />
      <Route exact path="/app/orders/:orderId" component={Orders} />
      <Route exact path="/app/powders" component={Powders} />
      <Route exact path="/app/powders/:powderId" component={PowdersDetails} />
      <Route exact path="/app/tests" component={Tests} />
      <Route exact path="/app/tests/:testId" component={Tests} />
    </Switch>
  )
}

export default Routing
