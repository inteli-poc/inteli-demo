import React from 'react'
import { Grid, Typography } from '@material-ui/core'

const PowdersHeader = ({ className }) => {
  return (
    <Grid className={className} container direction="row">
      <Grid item xs>
        <Typography variant="body2" color="textSecondary">
          Powder Id
        </Typography>
      </Grid>
      <Grid item xs>
        <Typography variant="body2" color="textSecondary">
          Base Material
        </Typography>
      </Grid>
      <Grid item xs>
        <Typography variant="body2" color="textSecondary">
          Alloy
        </Typography>
      </Grid>
      <Grid item xs>
        <Typography variant="body2" color="textSecondary">
          Weight
        </Typography>
      </Grid>
      <Grid item xs>
        <Typography variant="body2" color="textSecondary">
          Particle size range
        </Typography>
      </Grid>
      <Grid item xs>
        <Typography variant="body2" color="textSecondary">
          Location
        </Typography>
      </Grid>
      <Grid item xs>
        <Typography variant="body2" color="textSecondary">
          Status
        </Typography>
      </Grid>
    </Grid>
  )
}

export default PowdersHeader
