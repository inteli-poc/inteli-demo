import React from 'react'
import { AppBar } from '@material-ui/core'

import StaticNavigation from '../components/StaticNavigation'
import Navigation from '../components/Navigation'

const Header = ({ labType }) => {
    return (
        <AppBar>
            <StaticNavigation labType={labType} />
            <Navigation />
        </AppBar>
    )
}

export default Header
