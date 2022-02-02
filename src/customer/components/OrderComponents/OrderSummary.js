import React from 'react'
import { Paper, Typography, Grid, Box, CardMedia } from '@material-ui/core'

/*const useStyles = makeStyles((theme) => ({
  name: {
    marginBottom: '20px',
  },
  details: {
    marginRight: 24,
  },
}))*/

const OrderSummary = ({ partNumber, material, partName, alloy, image }) => {
  return (
    <Paper elevation={0} key={'90'}>
      <Box>
        <Grid container direction="row">
          <Grid container direction="row" item xs={3}>
            <CardMedia
              component="img"
              alt={partName}
              image={image}
              title={partName}
            />
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6">{partName}</Typography>
            <p>{partName}</p>
            <p>{partNumber}</p>
            <p>{material}</p>
            <p>{alloy}</p>
            <br />
            <a href="#">View Details</a>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6">Shipping Address</Typography>
            <p>Digital Catapult</p>
            <p>101 Euston Road</p>
            <p>London</p>
            <p>NW1 2RA</p>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6">£1200</Typography>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default OrderSummary
