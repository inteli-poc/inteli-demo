import React from 'react'
import { Grid, Toolbar } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  root: { padding: '0px' },
})

const LabTestsItemsWrapper = (props) => {
  const classes = useStyles()
  return (
    <Toolbar className={classes.root}>
      <Grid fixed="true" container spacing={0}>
        {props.children}
      </Grid>
    </Toolbar>
  )
}

export default LabTestsItemsWrapper
