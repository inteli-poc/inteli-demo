import React from 'react'
import { Paper, Typography, Grid, Box, CardMedia } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

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
    cost = `${cost}.00`
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
    quantity: quantity,
  } = props.order

  const classes = useStyles()
  return (
    <Paper className={classes.root} elevation={0} xs={12}>
      <Grid container className={classes.row} xs={12}>
        <Grid item xs={2}>
          <CardMedia
            component="img"
            alt={image}
            width="160"
            image={image}
            title={name}
          />
        </Grid>
        <Grid container item xs={4}>
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

              <DetailRow title="Unit Price" value={price}></DetailRow>
              <DetailRow
                title="Total Cost"
                value={getTotalCost(price, quantity)}
              ></DetailRow>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
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
      </Grid>
    </Paper>
  )
}

{
  /* <Paper className={classes.root} elevation={0}>
<Grid container className={classes.row}>
  <Grid item xs={3}>
    <CardMedia
      component="img"
      alt={name}
      width="160"
      image={image}
      title={name}
    />
  </Grid>
  <Grid container item xs={9}>
    <Typography
      gutterBottom
      variant="h5"
      className={classes.orderDetailsHeading}
    >
      {name}
    </Typography>
    <Grid container>
      <Grid item xs={3} className={classes.content}>
        <Box>
          <DetailRow
            variant="subtitle2"
            title="Part name"
            value={name}
          ></DetailRow>
          <DetailRow
            variant="subtitle2"
            title="Part Number"
            value={partNumber}
          ></DetailRow>
          <DetailRow
            variant="subtitle2"
            title="Material"
            value={material}
          ></DetailRow>
          <DetailRow
            variant="subtitle2"
            title="Alloy"
            value={alloy}
          ></DetailRow>
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box>
          <Typography variant="subtitle2">Shipping Address:</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Digital Catapult
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            101 Euston Road
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            London
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            NW1 2RA
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box>
          <Typography variant="subtitle2">Quantity: 200</Typography>
          <br />
          <Typography variant="subtitle2">Price: £1,200</Typography>
        </Box>
      </Grid>
    </Grid>
  </Grid>
</Grid>
</Paper> */
}

export default OrderSummary
