import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import CustomerApp from './customer'
import AdditiveManufacturerApp from './am'
import LaboratoryApp from './laboratory'
import rootReducer from './reducers'
import BlockchainWatcher from './shared/BlockchainWatcher.js'

import { Auth0Provider } from '@auth0/auth0-react'

const AUTH_DOMAIN = process.env.AUTH_DOMAIN || 'inteli.eu.auth0.com'
const AUTH_CLIENT_ID =
  process.env.AUTH_CLIENT_ID || 'BvJaBbxOce4Pwi5PZpjBTStvNWwzugPd'

const store = configureStore({
  reducer: rootReducer,
})

let App = null
let props = {}
switch (process.env.REACT_APP_VITALAM_DEMO_PERSONA) {
  case 'cust':
    App = CustomerApp
    document.title = 'BAE Systems | Customer'
    break
  case 'am':
    App = AdditiveManufacturerApp
    document.title = 'Maher | AM'
    break
  case 'lab':
    App = LaboratoryApp
    document.title = 'TruFORM | Lab'
    props = { labType: 'lab' }
    break
  case 'amlab':
    App = LaboratoryApp
    document.title = 'Aero | Lab'
    props = { labType: 'amlab' }
    break
  default:
    throw new Error('Invalid persona for VitalAM demo')
}

ReactDOM.render(
  <Auth0Provider
    domain={AUTH_DOMAIN}
    clientId={AUTH_CLIENT_ID}
    redirectUri={window.location.origin}
  >
    <Provider store={store}>
      <BlockchainWatcher>
        <App {...props} />
      </BlockchainWatcher>
    </Provider>
  </Auth0Provider>,
  document.getElementById('root')
)
