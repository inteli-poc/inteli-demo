import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Grid, Paper, Typography } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    marginTop: '40px',
    minHeight: '100px',
    padding: '8px',
  },
  container: {
    minHeight: '100px',
    textAlign: 'center',
  },
  text: {
    color: '#cccccc',
  },
})

const EmptyPageWrapper = (props) => {
  const classes = useStyles()
  return (
    <Grid container spacing={0} className={classes.root}>
      <Grid xs={12} spacing={1} className={classes.container}>
        <Paper style={{ minHeight: '100px' }}>
          <Grid xs={12} className={classes.container} />
          <Typography variant="subtitle2" className={classes.text}>
            {props.children}
          </Typography>
          <Grid xs={12} className={classes.container} />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default EmptyPageWrapper
