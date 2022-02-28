import React from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'

function PrivateRoute({ component }) {
  const AuthenticatedComponent = withAuthenticationRequired(component, {
    onRedirecting: () => <h1>Redirecting...</h1>,
  })

  return <AuthenticatedComponent />
}

export default PrivateRoute
