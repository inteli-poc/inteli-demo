import React from 'react'
import SearchField from './SearchField'
import CustomerPartItems from './CustomerPartItems'
import { Box, Grid, Typography } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useSelector } from 'react-redux'

const useStyles = makeStyles({
    searchFieldContainer: {
        marginBottom: 8,
    },
    searchResultsTotal: {
        marginTop: 16,
    },
})

const CustomerParts = () => {
    const customerParts = useSelector((state) => state.customerParts)
    const classes = useStyles()

    return (
        <Box>
            <Grid
                container
                direction="row"
                className={classes.searchFieldContainer}
                justify="flex-start"
            >
                <Grid item xs={11}>
                    <SearchField />
                </Grid>
                <Grid item xs={1} className={classes.searchResultsTotal}>
                    <Typography color="textSecondary">
                        {customerParts && customerParts.length
                            ? customerParts.length
                            : 0}{' '}
                        results
                    </Typography>
                </Grid>
            </Grid>
            <Grid
                container
                item
                direction="row"
                spacing={2}
                justify="flex-start"
            >
                <CustomerPartItems items={customerParts} />
            </Grid>
        </Box>
    )
}

export default CustomerParts
