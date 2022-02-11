import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, Grid, Typography } from '@material-ui/core'

import Attachment from '../Attachment'
import ShippingLabel from './ShippingLabel'

const useStyles = makeStyles({
    root: {
        padding: '32px',
        borderBottom: '1px lightgrey solid',
    },
    content: {
        paddingTop: '32px',
    },
    testListContainer: {
        marginRight: '32px',
    },
    documentsContainer: {
        marginLeft: '32px',
    },
    testListHeader: {
        borderBottom: '1px lightgrey solid',
        paddingBottom: '16px',
    },
    testListRow: {
        paddingTop: '2ch',
    },
    attachmentContainer: {
        marginTop: '64px',
    },
})

const TestDetails = ({ powder, tests }) => {
    const classes = useStyles()
    return (
        <Box className={classes.root}>
            <Typography variant="body1" color="textSecondary">
                Tests Required
            </Typography>
            <Grid container className={classes.content}>
                <Grid item xs className={classes.testListContainer}>
                    <Grid container className={classes.testListHeader}>
                        <Grid item xs={3}>
                            <Typography>Standard</Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography>Test</Typography>
                        </Grid>
                    </Grid>
                    {tests.map(([key, val]) => (
                        <Grid
                            container
                            className={classes.testListRow}
                            key={key}
                        >
                            <Grid item xs={3}>
                                <Typography>{key}</Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography>{val}</Typography>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
                <Grid item xs className={classes.documentsContainer}>
                    <Typography>Attached Documents</Typography>
                    <Box className={classes.attachmentContainer}>
                        <Attachment name="Customer Requirements"></Attachment>
                        <Attachment name="MSDS Form"></Attachment>
                    </Box>
                    <Typography>Sample label</Typography>
                    <ShippingLabel powder={powder} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default TestDetails
