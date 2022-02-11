import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { configureStore, applyMiddleware } from '@reduxjs/toolkit'

// this seems a little overkill to render a different app rather than render different components, we should focus on re-useable components
import CustomerApp from './customer'
import AdditiveManufacturerApp from './am'
import LaboratoryApp from './laboratory'
import rootReducer from './reducers'
import BlockchainWatcher from './shared/BlockchainWatcher.js'
import { loadAppState } from './features/appSlice'
import auth from './redux-middleware/auth'


// TODO move to sep file
const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middlewareEnhancer: composeWithDevTools(
        applyMiddleware(auth),
    ),
})

// move to middleware along with the new prop 'loaded: false' and update once don[e
store.dispatch(loadAppState())

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
    <Provider store={store}>
        <BlockchainWatcher>
            <App {...props} />
        </BlockchainWatcher>
    </Provider>,
    document.getElementById('root')
)
