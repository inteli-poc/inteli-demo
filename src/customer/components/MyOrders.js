// TODO Remove
/* eslint-disable */
import React from 'react'
import { Grid, Paper, Typography, CardMedia, Box } from '@material-ui/core'
//import BackButton from './BackButton'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useParams } from 'react-router-dom'

import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  backButton: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
  order: {
    width: '100%',
    border: 'solid #ccc 1px',
    paddingTop: '20px 20px 20px 0px',
    marginBottom: '8px',
  },
  detailText: {
    display: 'inline',
  },
  name: {
    marginBottom: '20px',
  },
  details: {
    // marginRight: 24,
  },
  mainPadding: {
    paddingTop: '130px',
  },
  leftColumn: {
    width: '390px',
    border: '1px solid #fff',
  },
  rightColumn: {
    /* width: '880px', */
    width: '1146px',
    borderRadius: '8px',
    border: '1px solid #fff',
  },
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
  containerWidth: {
    /* width: '1280px', */
    width: '1546px',
  },
}))

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

const MyOrders = () => {
  const params = useParams()
  const customerOrders = useSelector((state) => state.customerOrders)

  const initialOrder =
    customerOrders != null || customerOrders.length > 0
      ? customerOrders[customerOrders.length - 1]
      : null

  const selectedOrder = params.orderId
    ? customerOrders.find(({ id }) => `${id}` === params.orderId)
    : null
  const classes = useStyles()
  console.log('customerOrders.length', customerOrders)

  console.log('Selected order', selectedOrder)
  console.log('Params', params)
  console.log('InitialOrdeer', initialOrder)

  return (
    <Grid container className={classes.containerWidth}>
      <Grid item className={classes.leftColumn}>
        {[...customerOrders].reverse().map((order) => (
          <div key={order.id}>
            <Grid container xs={12} className={classes.listItemMargin}>
              <Grid item xs={3}>
                <CardMedia
                  component="img"
                  alt={order.orderDetails.name}
                  width="160"
                  image={order.orderDetails.image}
                  title={order.orderDetails.name}
                />
              </Grid>
              <Grid item xs={8}>
                <Typography
                  variant="h6"
                  component="h6"
                  className={classes.listPadding}
                >
                  {order.orderDetails.name}
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
                  Qnt: {order.quantity}
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="h6"
                  className={classes.datePadding}
                >
                  {order.deliveryBy}
                </Typography>
              </Grid>
            </Grid>
          </div>
        ))}
      </Grid>
      <Grid item className={classes.rightColumn}>
        <Paper className={classes.root} elevation={0} xs={12}>
          <Grid container className={classes.row}>
            <Grid item xs={2}>
              {/* <CardMedia
                component="img"
                alt={selectedOrder.image}
                width="160"
                image={selectedOrder.image}
                title={selectedOrder.image}
              /> */}
            </Grid>
            <Grid container item xs={4}>
              <Typography
                gutterBottom
                variant="body1"
                className={classes.orderDetailsHeading}
              >
                Order Details
              </Typography>
              <Grid container>
                <Grid item className={classes.content}>
                  <Box>
                    {/* <DetailRow title="Part name" value={name}></DetailRow>
                    <DetailRow title="Part Number" value={partId}></DetailRow>
                    <DetailRow title="Quantity" value={quantity}></DetailRow>
                    <DetailRow title="Material" value={material}></DetailRow>
                    <DetailRow title="Alloy" value={alloy}></DetailRow>

                    <DetailRow title="Unit Price" value={price}></DetailRow>
                    <DetailRow
                      title="Total Cost"
                      value={getTotalCost(price, quantity)}
                    ></DetailRow> */}
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box>
                    {/* <DetailRow
                      title="Customer name"
                      value={
                        order.CustomerDetails
                          ? 'not empty'
                          : 'no customer details'
                      }
                    ></DetailRow> */}
                    <Typography variant="subtitle2">
                      Shipping Address:
                    </Typography>
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
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default MyOrders
