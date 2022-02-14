import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useNavigate, useParams } from 'react-router-dom'

import { useSelector } from 'react-redux'
import SummaryRow from './OrderComponents/SummaryRow'
import OrderSummary from './OrderComponents/OrderSummary'

import uniqid from 'uniqid'

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
  const navigate = useNavigate()

  //This is where the ID from a previously selected item is stored
  const customerOrders = useSelector((state) => state.customerOrders)

  const selectedOrder = params.orderId
    ? customerOrders.find(({ id }) => `${id}` === params.orderId)
    : customerOrders[customerOrders.length - 1]

  console.log('Customer Orders', customerOrders)
  console.log('Selected Order', selectedOrder)
  console.log('Params', params.orderId)

  const getSelectedOrderId = () => {
    if (selectedOrder) {
      return selectedOrder.id
    } else if (customerOrders.length > 0) {
      return customerOrders[customerOrders.length - 1].id
    } else {
      return -1
    }
  }

  const selectedId = getSelectedOrderId()

  const isValidIdTest = (idToTest) => {
    if (idToTest != -1 && idToTest != undefined && !idToTest.isNaN) {
      return true
    } else {
      false
    }
  }

  const classes = useStyles()

  useEffect(() => {
    console.log('Use Effect', selectedId)

    if (isValidIdTest(selectedId)) {
      navigate({
        pathname: `/app/my-orders/${selectedId}`,
      })
    }
  }, [])

  return (
    <Grid container className={classes.containerWidth}>
      <Grid item className={classes.leftColumn}>
        {[...customerOrders].reverse().map((order) => (
          <SummaryRow
            key={uniqid()}
            order={order}
            activeItem={selectedId === order.id}
          />
        ))}
      </Grid>
      <Grid item className={classes.rightColumn}>
        {selectedOrder && <OrderSummary order={selectedOrder} />}
      </Grid>
    </Grid>
  )
}

export default MyOrders
