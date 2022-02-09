import React from 'react'
import { Paper, Typography, Grid, Box, CardMedia } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
//import OrderStatusProgressBar from '../OrderStatusProgressBar'
//import VerticalTest from './VerticalTest'
import VerticalTimeline from './verticalTimeline'

const useStyles = makeStyles({
  name: {
    marginBottom: '20px',
  },
  details: {
    marginRight: 24,
  },
  root: {
    marginLeft: '32px',
    border: 'solid 2px #ccc',
  },
  row: {
    padding: '16px 0px',
    borderBottom: '1px lightgrey solid',
  },
  inline: {
    display: 'inline',
  },
  orderDetailsHeading: {
    fontWeight: 600,
    paddingBottom: '50px',
  },
  addressMargin: {
    marginTop: '85px',
  },
  header: {
    padding: '16px 48px 12px 18px',
    '& h6': {
      marginRight: 'auto',
    },
  },
  maherStyle: {
    backgroundColor: '#0C74BB',
    color: '#ffff',
    padding: '5px',
    marginTop: '30px',
    border: ' 1px solid 0C74BB',
    borderRadius: '3px',
    marginRight: '20px',
  },
  leftPadding: {
    paddingLeft: '60px',
    marginBottom: '20px',
  },
  columnTwoPadding: {
    paddingLeft: '40px',
  },
  pricePadding: {
    paddingBottom: '25px',
  },
  picturePadding: {
    paddingLeft: '10px',
  },
})

const DetailRow = ({ title, value }) => {
  const classes = useStyles()
  return (
    <Box>
      <Typography className={classes.inline} variant="subtitle2">
        {title}:
      </Typography>
      &nbsp;
      <Typography
        className={classes.inline}
        variant="subtitle1"
        color="textSecondary"
      >
        {value}
      </Typography>
    </Box>
  )
}
const getTotalCost = (price, quantity) => {
  let cost = '0.00'

  if (price && quantity) {
    cost = price * quantity
    cost = `£${cost}.00`
  }

  return cost
}

const OrderSummary = (props) => {
  const {
    //id: orderId,
    orderDetails: {
      name: name,
      image: image,
      alloy: alloy,
      material: material,
      partId: partId,
      price: price,
    },
    //deliveryBy: deliveryBy,
    type: type,
    quantity: quantity,
  } = props.order

  const classes = useStyles()
  return (
    <Paper className={classes.root} elevation={0} xs={12}>
      <Grid container className={classes.row}>
        <Grid item xs={2}>
          <CardMedia
            component="img"
            alt={image}
            width="160"
            height="160px"
            image={image}
            title={name}
            className={classes.picturePadding}
          />
        </Grid>
        <Grid container item xs={4} className={classes.columnTwoPadding}>
          <Typography
            gutterBottom
            variant="h6"
            className={classes.orderDetailsHeading}
          >
            {name}
          </Typography>
          <Grid container>
            <Grid item className={classes.content}>
              <DetailRow title="Part name" value={name}></DetailRow>
              <DetailRow title="Part Number" value={partId}></DetailRow>
              <DetailRow title="Quantity" value={quantity}></DetailRow>
              <DetailRow title="Material" value={material}></DetailRow>
              <DetailRow title="Alloy" value={alloy}></DetailRow>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Box className={classes.addressMargin}>
            <Typography variant="h6">Shipping Address:</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Digital Catapult
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              101 Euston Road
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              London
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              NW1 2RA
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <div className={classes.addressMargin}>
            <DetailRow
              title="Quantity"
              value={quantity}
              className={classes.pricePadding}
            ></DetailRow>
            <DetailRow
              title="Price"
              className={classes.pricePadding}
              value={getTotalCost(price, quantity)}
            ></DetailRow>
            <Typography
              variant="subtitle2"
              component="h6"
              display="inline"
              className={classes.maherStyle}
            >
              MAHER
            </Typography>
          </div>
        </Grid>
      </Grid>
      <Grid
        container
        alignItems="center"
        className={`${classes.row} ${classes.header}`}
      >
        <Box>
          <Grid item>
            <Typography
              style={{ color: '#494E56' }}
              className={classes.leftPadding}
              variant="h5"
            >
              Order Status
            </Typography>

            <VerticalTimeline props={type}></VerticalTimeline>
          </Grid>
        </Box>
      </Grid>
    </Paper>
  )
}

export default OrderSummary
