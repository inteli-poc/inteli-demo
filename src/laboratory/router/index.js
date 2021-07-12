import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Request from '../components/Request'
import Tested from '../components/Tested'

const Routing = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/app/requests" />
      <Route exact path="/app/requests" component={Request} />
      <Route exact path="/app/requests/:testId" component={Request} />
      <Route exact path="/app/tested" component={Tested} />
      <Route exact path="/app/tested/:testId" component={Tested} />
    </Switch>
  )
}

export default Routing
