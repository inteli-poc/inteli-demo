// TODO Remove
/* eslint-disable */
import React from 'react'
import { Grid, Paper, Typography, CardMedia, Box } from '@material-ui/core'
//import BackButton from './BackButton'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useParams } from 'react-router-dom'

import { useSelector } from 'react-redux'
import SummaryRow from './OrderComponents/summaryRow'
import OrderSummary from './OrderComponents/OrderSummary'

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
  },
  rightColumn: {
    /* width: '880px', */
    width: '1146px',
    borderRadius: '8px',
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
  active: {
    background: 'green',
  },
  notActive: {
    background: 'red',
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

  const startingOrder = () => {
    if (selectedOrder != null) {
      return selectedOrder
    } else if (initialOrder != null) {
      return initialOrder
    } else {
      return null
    }
  }
  const id = startingOrder()
  for (var key in id) {
    console.log(key, typeof key)
  }

  return (
    <Grid container className={classes.containerWidth}>
      <Grid item className={classes.leftColumn}>
        {[...customerOrders].reverse().map((order) => (
          <SummaryRow order={order} />
        ))}
      </Grid>
      <Grid item className={classes.rightColumn}>
        {startingOrder() != null ? (
          <OrderSummary order={startingOrder()} />
        ) : null}
      </Grid>
    </Grid>
  )
}

export default MyOrders
