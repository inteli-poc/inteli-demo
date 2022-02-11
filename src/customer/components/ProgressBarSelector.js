import React from 'react'
import { Grid } from '@material-ui/core'
import { ReactComponent as OrderPlacedStatus } from '../../images/order-placed.svg'
import { ReactComponent as OrderPlacedAcceptedStatus } from '../../images/order-placed-accepted.svg'
import { ReactComponent as OrderAcceptedStatus } from '../../images/order-accepted.svg'
import { ReactComponent as OrderNonStatus } from '../../images/order-non.svg'

const ProgressBarSelector = (props) => {
    const { statusIndex } = props

    switch (statusIndex) {
        case 0:
            return (
                <Grid item>
                    <OrderPlacedStatus />
                    <OrderNonStatus />
                    <OrderNonStatus />
                    <OrderNonStatus />
                </Grid>
            )
        case 1:
            return (
                <Grid item>
                    <OrderPlacedAcceptedStatus />
                    <OrderNonStatus />
                    <OrderNonStatus />
                    <OrderNonStatus />
                </Grid>
            )
        case 2:
            return (
                <Grid item>
                    <OrderPlacedAcceptedStatus />
                    <OrderAcceptedStatus />
                    <OrderNonStatus />
                    <OrderNonStatus />
                </Grid>
            )
        case 3:
            return (
                <Grid item>
                    <OrderPlacedAcceptedStatus />
                    <OrderAcceptedStatus />
                    <OrderAcceptedStatus />
                    <OrderNonStatus />
                </Grid>
            )
        case 4:
            return (
                <Grid item>
                    <OrderPlacedAcceptedStatus />
                    <OrderAcceptedStatus />
                    <OrderAcceptedStatus />
                    <OrderAcceptedStatus />
                </Grid>
            )
    }
}

export default ProgressBarSelector
