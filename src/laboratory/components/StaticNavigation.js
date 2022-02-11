import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { NavLink } from 'react-router-dom'
import { Container, Grid, Typography } from '@material-ui/core'

import NetworkStatusIndicator from './NetworkStatusIndicator'
import images from '../../images'

const useStyles = makeStyles((theme) => ({
    logoWrapper: {
        '& a': {
            lineHeight: '85px',
            '& img': {
                verticalAlign: 'middle',
            },
        },
    },
    accountNameWrapper: {
        textDecoration: 'none',
        display: 'flex',
        gap: '10px',
        color: theme.palette.primary.contrastText,
        alignItems: 'center',
        justifyContent: 'right',
    },
    networkStatusWrapper: {
        display: 'grid',
        justifyItems: 'right',
        alignItems: 'center',
    },
    avatar: {
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
        width: '32px',
        height: '32px',
        color: theme.palette.primary.main,
        background: theme.palette.primary.contrastText,
        borderRadius: '50%',
        fontSize: '1.2rem',
        fontWeight: '500',
    },
}))

const StaticNavigation = ({ labType }) => {
    const classes = useStyles()

    const logo = labType === 'lab' ? images.logoLab : images.logoAM
    const name = labType === 'lab' ? 'Simon Smith' : 'Eve Smith'

    return (
        <Container spacing={0}>
            <Grid container>
                <Grid item xs={1} />
                <Grid item xs={2} className={classes.logoWrapper}>
                    <NavLink to="#" style={{ textAlign: 'center' }}>
                        <img src={logo} alt=""></img>
                    </NavLink>
                </Grid>
                <Grid item xs={5} />
                <Grid
                    item
                    xs={2}
                    className={classes.accountNameWrapper}
                    component={NavLink}
                    to="#"
                >
                    <Typography variant="subtitle2">{name}</Typography>
                    <Typography className={classes.avatar}>
                        {name.substring(0, 1)}
                    </Typography>
                </Grid>
                <Grid item xs={1} className={classes.networkStatusWrapper}>
                    <NetworkStatusIndicator />
                </Grid>
                <Grid item xs={1} />
            </Grid>
        </Container>
    )
}

export default StaticNavigation
