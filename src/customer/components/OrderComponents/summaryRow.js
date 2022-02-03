import React from 'react'
import { Typography, Grid, CardMedia } from '@material-ui/core'

/*const useStyles = makeStyles((theme) => ({
  name: {
    marginBottom: '20px',
  },
  details: {
    marginRight: 24,
  },
}))*/

const SummaryRow = ({ partName, image }) => {
  return (
    <div>
      <Grid container>
        <Grid container direction="row" item xs={4}>
          <CardMedia
            component="img"
            alt={partName}
            image={image}
            title={partName}
          />
        </Grid>
        <Typography variant="h5">{partName}</Typography>
      </Grid>
    </div>
  )
}

export default SummaryRow
