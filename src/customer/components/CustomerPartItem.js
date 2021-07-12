import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import CardActionArea from '@material-ui/core/CardActionArea'
import {
  Paper,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from '@material-ui/core'

import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  root: {
    padding: 8,
    width: 291,
    height: 277,
    border: 'none',
  },
  top: {
    backgroundColor: '#ccc',
    height: 182,
  },
  details: {
    display: 'inline',
  },
})

const CustomerPartItem = (props) => {
  const { partId, image, name, material } = props
  const classes = useStyles()

  return (
    <Paper elevation={0} id={partId} className={classes.root}>
      <CardActionArea
        component={RouterLink}
        to={`/app/customer-part/${partId}`}
      >
        <CardMedia
          component="img"
          alt={name}
          height="182"
          image={image}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="body1">
            {name}
          </Typography>
          <Grid container justify="space-between" alignItems="center">
            <Typography variant="body2" color="textSecondary">
              {partId}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {material}
            </Typography>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Paper>
  )
}

export default CustomerPartItem
