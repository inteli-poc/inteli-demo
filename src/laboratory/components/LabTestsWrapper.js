import React from 'react'
import { Grid } from '@material-ui/core'

const LabTestsWrapper = (props) => {
    return (
        <Grid fixed="true" container spacing={0}>
            {props.children}
        </Grid>
    )
}

export default LabTestsWrapper
