/* eslint-disable */
import React, { useEffect, useState } from 'react'
import {
  CardMedia,
  Container,
  Box,
  Grid,
  Paper,
  Typography,
  InputLabel,
  Input,
  CircularProgress,
} from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useDispatch, useSelector } from 'react-redux'

import { markOrderRead } from '../../../features/readOrdersSlice'
import OrderStatus from './Status'
import AcceptOrderAction from './AcceptAction'
import AmendOrderAction from './AmendAction'
import ManufactureOrderAction from './ManufactureAction'
import Attachment from '../Attachment'
import moment from 'moment'
import Button from '@material-ui/core/Button'
import rejectAndNegotiateCloseX from '../../../images/close-x-black-icon.svg'

const useStyles = makeStyles({
  root: {
    marginLeft: '32px',
    // border: 'solid 2px #ccc',
  },
  row: {
    padding: '16px 0px',
    // borderBottom: '1px lightgrey solid',
  },
  acceptRow: {
    padding: '16px 0px',
  },
  header: {
    padding: '16px 48px 12px 18px',
    '& h6': {
      marginRight: 'auto',
    },
  },
  orderDetailsHeading: {
    fontWeight: 600,
  },
  content: {
    position: 'relative',
  },
  inline: {
    display: 'inline',
  },
  attachment: {
    width: '100%',
  },
  acceptOrderButton: {
    width: '100%',
  },
  buttonWrapper: {
    padding: '16px 16px',
    // width: '100%',
    // display: 'grid',
    // justifyContent: 'right',
  },
  rejectAndNegotiateFieldsContainer: {
    margin: '32px 24px',
  },
  quantityContainer: {
    // width: '100%',
    margin: '0px 0px',
    // padding: '8px 16px',
    // height: '18px',
    padding: '0px',
    display: 'grid',
    gridTemplateColumns: '1fr',
  },
  quantityLabel: {
    margin: '12px 0px 12px 0px',
    padding: '0px',
    // margin: '0px 16px',
    color: '#000',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  quantityInput: {
    // margin: '0px 16px',
    width: '120px',
    border: '1px #d3d3d3 solid',
    borderRadius: '10px',
    height: '40px',
    fontSize: '0.9rem',
    padding: '16px',
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
  },
  deliveryByContainer: {
    // width: '100%',
    // margin: '0px 32px 8px 8px',
    // margin: '0px 16px',
    padding: '0px',
    // height: '18px',
    display: 'grid',
    gridTemplateColumns: '4fr',
  },
  deliveryByLabel: {
    // width: '90px',
    margin: '12px 0px 12px 0px',
    padding: '0px',
    color: '#000',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  deliveryByInput: {
    width: '120px',
    // margin: '0px 16px',
    border: '1px #d3d3d3 solid',
    borderRadius: '10px',
    height: '40px',
    fontSize: '0.8rem',
    padding: '16px',
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
  },
  rejectAndNegotiateToggle: {
    '&&:hover': {
      cursor: 'pointer',
    },
  },
  rejectAndNegotiateXAlign: {
    // width: '100%',
    // alignItems: 'right',
  },
  rejectAndNegotiateX: {
    width: '16px',
    height: '16px',
    '&&:hover': {
      cursor: 'pointer',
    },
  },
  rejectAndNegotiateTitle: {
    textDecoration: 'underline',
    margin: '0px 0px 0px 16px',
    fontWeight: '600',
  },
  rejectAndNegotiateDownArrow: {
    margin: '6px 0px 0px 12px',
    width: '0px',
    height: '0px',
    borderLeft: '6px solid transparent',
    borderRight: '6px solid transparent',
    borderTop: '6px solid #000',
  },
  rejectAndNegotiateUpArrow: {
    margin: '6px 0px 0px 12px',
    width: '0px',
    height: '0px',
    borderLeft: '6px solid transparent',
    borderRight: '6px solid transparent',
    borderBottom: '6px solid #000',
  },
  rejectAndNegotiateClose: {
    margin: '0px 16px',
  },
  rejectAndNegotiateText: {
    margin: '32px 16px',
    fontSize: '0.9rem',
  },
  contentForm: {
    margin: '0px 64px 0px -8px',
    padding: '0px',
  },
  rightColumn: {
    padding: '64px 0px 112px 16px',
  },
  rightColumnBottom: {
    marginTop: '96px',
  },
  partTitle: {
    // fontSize: '1.4rem',
    fontWeight: '600',
    marginBottom: '32px',
  },
  shippingAddress: {
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '16px',
  },
  amendPurchaseOrderButton: {
    width: 230,
    height: 42,
    backgroundColor: '#484D54FF',
    margin: '12px 24px',
  },
  errorText: {
    color: '#ff0000',
    fontSize: '1rem',
    margin: '8px 0px',
  },
  negotiationContainer: {
    padding: '0px',
    margin: '0px 32px',
  },
  negotiationButtonWrapper: {
    padding: '16px 16px',
    margin: '0px 24px 0px 24px',
  },
})

const DATE_FORMAT = 'DD/MM/YYYY'

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

const EmptyAction = () => {
  return <></>
}

const getTotalCost = (price, quantity) => {
  let cost = '0.00'

  if (price && quantity) {
    cost = price * quantity
    cost = `${cost}.00`
  }

  return cost
}

// TODO move
import images from '../../../images'

const OrderDetail = ({ order }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [isAmendingOrder, setIsAmendingOrder] = useState(false)

  const { partId, image, name, material, alloy, price } = order.orderDetails

  const [quantity, setQuantity] = useState(1)
  const [quantityError, setQuantityError] = useState('')
  const [deliveryBy, setDeliveryBy] = useState('')
  const [deliveryByError, setDeliveryByError] = useState('')
  const [displayNegotiation, setDisplayNegotiation] = useState(true)

  useEffect(() => {
    dispatch(markOrderRead(order.id))
  }, [order, dispatch])

  let Action = null
  switch (order.type) {
    case 'SubmittedOrder':
      Action = AcceptOrderAction
      break
    case 'AmendedOrder':
      Action = AmendOrderAction
      break
    case 'AcceptedOrder':
      Action = ManufactureOrderAction
      break
    case 'ManufacturedOrder':
      Action = EmptyAction
      break
    case 'ManufacturingOrder':
      Action = EmptyAction
      break
    default:
      Action = EmptyAction
      break
  }

  const toggleNegotiationDisplay = () => {
    setDisplayNegotiation(!displayNegotiation)
  }

  const onChange = async () => {
    if (isFormReady()) {
      setIsAmendingOrder(true)
    }
  }

  const isQuantityInvalid = (value, maxValue = 0) => {
    if (!isNaN(value) && value > 0 && maxValue && value > maxValue) {
      return 'Not more than ordered'
    } else if (!isNaN(value) && value < 1) {
      return 'More than 0'
    } else {
      return ''
    }
  }

  const setQuantityValue = (value) => {
    const quantityValue = value.replace(/\D/g, '')

    setQuantityError(isQuantityInvalid(quantityValue, order.quantity))
    setQuantity(quantityValue)
  }

  const isDeliveryByInvalid = (value, maxDate = '') => {
    // if (value && value.length === 10) {
    const date = moment(value, DATE_FORMAT)

    if (!date.isValid()) {
      return `Invalid date (${DATE_FORMAT})`
    } else if (
      date.isValid() &&
      maxDate &&
      date.isBefore(moment(maxDate, DATE_FORMAT))
    ) {
      return 'Not before order date'
    } else if (date.isValid() && date.isSameOrBefore(moment().startOf('day'))) {
      return 'Not before today'
    } else {
      return ''
    }
    // }
  }

  const setDeliveryByValue = (value) => {
    setDeliveryByError(isDeliveryByInvalid(value, order.deliveryBy))
    setDeliveryBy(value)
  }

  const handleChange = (name) => (event) => {
    switch (name) {
      case 'quantity':
        setQuantityValue(event.target.value)
        break
      case 'deliveryBy':
        setDeliveryByValue(event.target.value)
        break
    }
  }

  const isFormReady = () => {
    return !isQuantityInvalid(quantity) && !isDeliveryByInvalid(deliveryBy)
  }

  return (
    <Paper className={classes.root} elevation={0}>
      <Grid
        container
        alignItems="center"
        className={`${classes.row} ${classes.header}`}
      >
        <Grid item xs={9}>
          <Typography variant="h6" component="h6">
            Order: {order.orderReference}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <OrderStatus orderStatus={order.type} />
        </Grid>
      </Grid>
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
            variant="body1"
            className={classes.orderDetailsHeading}
          >
            Order Details
          </Typography>
          <Grid container>
            <Grid item xs={6} className={classes.content}>
              <Box>
                <DetailRow title="Part name" value={name}></DetailRow>
                <DetailRow title="Part Number" value={partId}></DetailRow>
                <DetailRow title="Quantity" value={quantity}></DetailRow>
                <DetailRow title="Material" value={material}></DetailRow>
                <DetailRow title="Alloy" value={alloy}></DetailRow>
                <DetailRow
                  title="Delivery By"
                  value={order.deliveryBy}
                ></DetailRow>
                <DetailRow title="Unit Price" value={price}></DetailRow>
                <DetailRow
                  title="Total Cost"
                  value={getTotalCost(price, order.quantity)}
                ></DetailRow>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <DetailRow
                  title="Customer name"
                  value={
                    order.CustomerDetails ? 'not empty' : 'no customer details'
                  }
                ></DetailRow>
                <Typography variant="subtitle2">Shipping Address:</Typography>
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
      <Grid
        container
        alignItems="center"
        className={`${classes.row} ${classes.header}`}
      >
        <Box className={classes.attachment}>
          <DetailRow title="Attached Documents"></DetailRow>
          <Attachment name="Requirements.PDF" />
          <Attachment name="CAD" />
        </Box>
      </Grid>
      <Grid container className={`${classes.acceptRow}`}>
        <Grid item xs={12}>
          <Container className={classes.buttonWrapper}>
            <Action order={order} buttonText="ACCEPT ORDER" />
          </Container>
        </Grid>
      </Grid>
      <Box container className={classes.row}>
        <Grid item xs={12}>
          {/*<Box >*/}
          <Grid container className={classes.rejectAndNegotiateToggle}>
            <div
              item
              className={classes.rejectAndNegotiateTitle}
              onClick={toggleNegotiationDisplay}
            >
              Reject &amp; negotiate
            </div>
            <div
              item
              className={
                displayNegotiation
                  ? classes.rejectAndNegotiateDownArrow
                  : classes.rejectAndNegotiateUpArrow
              }
            ></div>
            <div className={classes.rejectAndNegotiateXAlign}>
              <CardMedia
                image={rejectAndNegotiateCloseX}
                className={`${classes.rejectAndNegotiateX} ${classes.rejectAndNegotiateToggle}`}
                onClick={toggleNegotiationDisplay}
              />
            </div>
          </Grid>
          {/*</Box>*/}
          {displayNegotiation && (
            <Grid
              container
              className={classes.rejectAndNegotiateFieldsContainer}
            >
              <Grid item className={classes.rejectAndNegotiateText}>
                <Typography item variant="subtitle1" color="textSecondary">
                  In the case you can't meet the requirements of the purchase
                  order, you may negotiate the quantity and set a delivery date
                  of the remaining items.
                </Typography>
              </Grid>
              <Grid item xs={4} className={classes.quantityContainer}>
                <InputLabel item className={classes.quantityLabel}>
                  *Processed Quantity:
                </InputLabel>
                <Input
                  item
                  className={classes.quantityInput}
                  name="quantity"
                  onChange={handleChange('quantity')}
                  value={quantity}
                />
                <div className={classes.errorText}>{quantityError}</div>
              </Grid>
              <Grid className={classes.deliveryByContainer}>
                <InputLabel className={classes.deliveryByLabel}>
                  *Delivery date of remaining items:
                </InputLabel>
                <Input
                  className={classes.deliveryByInput}
                  name="deliveryBy"
                  placeholder={DATE_FORMAT}
                  onChange={handleChange('deliveryBy')}
                  value={deliveryBy}
                />
                <div className={classes.errorText}>{deliveryByError}</div>
              </Grid>
              <Button
                size="medium"
                variant="contained"
                color="primary"
                className={classes.amendPurchaseOrderButton}
                onClick={isAmendingOrder ? null : onChange}
                disabled={!isFormReady()}
              >
                {isAmendingOrder ? (
                  <CircularProgress color="secondary" size="30px" />
                ) : (
                  'SEND NEGOTIATION'
                )}
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
    </Paper>
  )
}

export default OrderDetail
