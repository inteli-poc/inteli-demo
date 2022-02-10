import React from 'react'
import {
  Typography,
  Grid,
  CardMedia,
  Paper,
  CardActionArea,
} from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Link as RouterLink } from 'react-router-dom'

const useStyles = makeStyles({
  maherStyle: {
    backgroundColor: '#0C74BB',
    color: '#ffff',
    padding: '5px',
    border: ' 1px solid 0C74BB',
    borderRadius: '3px',
    marginRight: '20px',
  },
  listPadding: {
    marginBottom: '10px',
  },
  listItemMargin: {
    marginBottom: '60px',
  },
  datePadding: {
    paddingLeft: '80px',
  },
  root: {
    padding: 8,
    width: '100%',
    height: '100px',
    marginBottom: '40px',
    borderRadius: '8px',
    textDecoration: 'none',
  },
})

const SummaryRow = (props) => {
  const {
    id: orderId,
    orderDetails: { name: name, image: image },
    deliveryBy: deliveryBy,
    quantity: quantity,
  } = props.order
  const classes = useStyles()
  return (
    <Paper id={orderId} elevation={0} className={classes.root}>
      <CardActionArea component={RouterLink} to={`/app/my-orders/${orderId}`}>
        <Grid container xs={12} className={classes.listItemMargin}>
          <Grid item xs={3}>
            <CardMedia
              component="img"
              alt={name}
              width="160"
              image={image}
              title={name}
            />
          </Grid>
          <Grid item xs={8}>
            <Typography
              variant="h6"
              component="h6"
              className={classes.listPadding}
            >
              {name}
            </Typography>
            <Typography
              variant="subtitle2"
              component="h6"
              display="inline"
              className={classes.maherStyle}
            >
              MAHER
            </Typography>
            <Typography variant="subtitle1" component="h6" display="inline">
              Qnt: {quantity}
            </Typography>
            <Typography
              variant="subtitle1"
              component="h6"
              className={classes.datePadding}
            >
              {deliveryBy}
            </Typography>
          </Grid>
        </Grid>
      </CardActionArea>
    </Paper>
  )
}

export default SummaryRow
