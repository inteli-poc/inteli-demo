import React from 'react'
import { useSelector } from 'react-redux'
import { CardMedia, makeStyles } from '@material-ui/core'

import images from '../../images'

const substrateHost = process.env.REACT_APP_SUBSTRATE_HOST
const substratePort = process.env.REACT_APP_SUBSTRATE_PORT

const useStyles = makeStyles({
    statusImage: {
        width: '34px',
        height: '26px',
    },
})

const NetworkStatusIndicator = () => {
    const networkStatus = useSelector((state) => state.networkStatus)
    const classes = useStyles()

    const statusImage = networkStatus
        ? images.networkGoodCustIcon
        : images.networkBadCustIcon

    return (
        <a
            target="_blank"
            rel="noreferrer"
            href={`https://polkadot.js.org/apps/?rpc=${encodeURIComponent(
                `ws://${substrateHost}:${substratePort}#`
            )}/explorer`}
            className={classes.statusImage}
        >
            <CardMedia image={statusImage} className={classes.statusImage} />
        </a>
    )
}

export default NetworkStatusIndicator
