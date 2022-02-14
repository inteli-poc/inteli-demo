import React from 'react'
import { Grid } from '@material-ui/core'
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

const MyOrders = () => {
  const params = useParams()

  //This is where the ID from a previously selected item is stored
  const customerOrders = useSelector((state) => state.customerOrders)

  // Stores and sets which item is active
  const [activeItem, setActiveItem] = React.useState(undefined)

  // The initial order shown in the list is always the last one unless there is
  // a pre-selected order ID in the params
  const initialOrder =
    customerOrders != null || customerOrders.length > 0
      ? customerOrders[customerOrders.length - 1]
      : null

  const selectedOrder = params.orderId
    ? customerOrders.find(({ id }) => `${id}` === params.orderId)
    : null
  const classes = useStyles()

  const startingOrder = () => {
    if (selectedOrder != null) {
      return selectedOrder
    } else if (initialOrder != null) {
      return initialOrder
    } else {
      return null
    }
  }

  return (
    <Grid container className={classes.containerWidth}>
      <Grid item className={classes.leftColumn}>
        {[...customerOrders].reverse().map((order) => (
          <SummaryRow
            setActiveItem={setActiveItem}
            isActive={activeItem /*id*/ === order.id}
            order={order}
          />
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
