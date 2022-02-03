import React, { useEffect, useState } from 'react'
import {
  CardMedia,
  Box,
  Grid,
  Paper,
  Typography,
  InputLabel,
  Input,
  CircularProgress,
  TextField,
} from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import Button from '@material-ui/core/Button'

import { markOrderRead } from '../../../features/readOrdersSlice'
import OrderStatus from './Status'
import AcceptOrderAction from './AcceptAction'
import AmendOrderAction from './AmendAction'
import ManufactureOrderAction from './ManufactureAction'
import Attachment from '../Attachment'
import rejectAndNegotiateCloseX from '../../../images/close-x-black-icon.svg'
import { updateOrder } from '../../../features/ordersSlice'
import { identities, useApi } from '../../../utils'

const useStyles = makeStyles({
  root: {
    marginLeft: '32px',
  },
  row: {
    padding: '16px 0px',
  },
  acceptRow: {
    padding: '16px 0px',
  },
  header: {
    padding: '24px 28px',
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
  quantityContainer: {
    margin: '0px 0px',
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
    padding: '0px',
    // height: '18px',
    display: 'grid',
    gridTemplateColumns: '4fr',
  },
  deliveryByLabel: {
    margin: '12px 0px 12px 0px',
    padding: '0px',
    color: '#000',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  deliveryByInput: {
    border: '1px #d3d3d3 solid',
    borderRadius: '10px',
    height: '32px',
    fontSize: '0.8rem',
    padding: '4px 16px',
    textDecoration: 'none',
  },
  rejectAndNegotiateContainer: {
    padding: '24px 28px',
    margin: '32px 0px',
    width: '100%',
  },
  rejectAndNegotiateToggle: {
    '&&:hover': {
      cursor: 'pointer',
    },
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
    fontWeight: '600',
  },
  rejectAndNegotiateDownArrow: {
    margin: '6px',
    width: '0px',
    height: '0px',
    borderLeft: '6px solid transparent',
    borderRight: '6px solid transparent',
    borderTop: '6px solid #000',
  },
  rejectAndNegotiateUpArrow: {
    margin: '6px',
    width: '0px',
    height: '0px',
    borderLeft: '6px solid transparent',
    borderRight: '6px solid transparent',
    borderBottom: '6px solid #000',
  },
  rejectAndNegotiateText: {
    margin: '32px 0px',
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
    fontWeight: '600',
    marginBottom: '32px',
  },
  shippingAddress: {
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '16px',
  },

  errorText: {
    color: '#ff0000',
    fontSize: '1rem',
    margin: '8px 0px',
  },
  amendPurchaseOrderButton: {
    width: '230px',
    height: '42px',
    backgroundColor: '#484D54FF',
  },
  negotiationButtonWrapper: {
    width: '100%',
    margin: '24px 0px 8px 0px',
  },
})

const DATE_FORMAT = 'YYYY-MM-DD'

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

const OrderDetail = ({ order }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isAmendingOrder, setIsAmendingOrder] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [quantityError, setQuantityError] = useState('')
  const [deliveryBy, setDeliveryBy] = useState('')
  const [deliveryByError, setDeliveryByError] = useState('')
  const [displayNegotiation, setDisplayNegotiation] = useState(true)

  const { partId, image, name, material, alloy, price } = order.orderDetails

  const api = useApi()

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

  const createFormData = (inputs, file) => {
    const formData = new FormData()
    const outputs = [
      {
        owner: identities.am,
        metadataFile: 'file',
        metadataLiteral: 'literal',
      },
    ]

    formData.set(
      'request',
      JSON.stringify({
        inputs,
        outputs,
      })
    )

    formData.set('file', file, 'file')

    return formData
  }

  const onChange = async () => {
    if (isFormReady()) {
      setIsAmendingOrder(true)

      // const file = new Blob([JSON.stringify(fileData)])

      //   [{
      //   roles: [
      //     { 'Assignee': 'SupplierT1' },
      //   ],
      //   metadata: {
      //     typeLiteral: {
      //       type: 'PO',
      //     },
      //     statusLiteral: {
      //       status: 'amended',
      //     },
      //     recipeFile: {
      //       type: 'FILE', value: 'recipe.pdf',
      //     }
      //   }
      // }]

      const fileData = {
        type: 'AmendedOrder',
        orderReference: `#${Math.floor(Math.random() * 100000000)}`,
        orderDetails: order.orderDetails,
        customerDetails: {},
        quantity,
        deliveryBy,
      }
      const file = new Blob([JSON.stringify(fileData)])
      const literalData = {
        type: 'AmendedOrder',
        orderReference: `#${Math.floor(Math.random() * 100000000)}`,
        orderDetails: order.orderDetails,
        metadata: {
          typeLiteral: {
            type: 'PO',
          },
          statusLiteral: {
            status: 'amended',
          },
        },
        quantity,
        deliveryBy,
      }
      const formData = createFormData(
        [],
        [JSON.stringify(literalData), JSON.stringify(fileData)]
      )
      const response = await api.runProcess(formData)
      const token = { id: response[0], latestId: response[0], ...file }

      dispatch(updateOrder(token))

      navigate('/app/orders')
    }
  }

  const isQuantityInvalid = (value, maxValue = 0) => {
    if (!isNaN(value) && parseInt(value, 10) > maxValue) {
      return 'Must be less than order'
    } else if (!isNaN(value) && parseInt(value, 10) < 1) {
      return 'More than 0'
    } else if (value === '') {
      return 'Must be a number'
    } else {
      return ''
    }
  }

  const setQuantityValue = (value) => {
    const quantityValue = value.replace(/\D/g, '')

    setQuantityError(isQuantityInvalid(quantityValue, order.quantity))
    setQuantity(parseInt(quantityValue, 10) || quantityValue)
  }

  const isDeliveryByInvalid = (value) => {
    const date = moment(value, DATE_FORMAT)

    if (!date.isValid()) {
      return 'Invalid date (dd/mm/yyyy)'
    } else if (date.isValid() && date.isBefore(moment().startOf('day'))) {
      return 'Not before today'
    } else {
      return ''
    }
  }

  const setDeliveryByValue = (value) => {
    setDeliveryByError(isDeliveryByInvalid(value))
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
    return (
      !isQuantityInvalid(quantity, order.quantity) &&
      !isDeliveryByInvalid(deliveryBy)
    )
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
                <DetailRow title="Quantity" value={order.quantity}></DetailRow>
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
      <Grid container>
        <Grid item xs={12}>
          <Action order={order} buttonText="ACCEPT ORDER" />
        </Grid>
      </Grid>
      <Grid
        container
        justify="space-between"
        className={classes.rejectAndNegotiateContainer}
      >
        <Grid item>
          <Grid container>
            <Grid
              item
              className={`${classes.rejectAndNegotiateTitle} ${classes.rejectAndNegotiateToggle}`}
              onClick={toggleNegotiationDisplay}
            >
              Reject &amp; negotiate
            </Grid>
            <Grid
              item
              className={
                displayNegotiation
                  ? classes.rejectAndNegotiateDownArrow
                  : classes.rejectAndNegotiateUpArrow
              }
            ></Grid>
          </Grid>
        </Grid>
        {displayNegotiation && (
          <Grid item>
            <CardMedia
              image={rejectAndNegotiateCloseX}
              className={`${classes.rejectAndNegotiateX} ${classes.rejectAndNegotiateToggle}`}
              onClick={toggleNegotiationDisplay}
            />
          </Grid>
        )}
        {displayNegotiation && (
          <Grid container>
            <Grid item className={classes.rejectAndNegotiateText}>
              <Typography item variant="subtitle1" color="textSecondary">
                In the case you can&apos;t meet the requirements of the purchase
                order, you may negotiate the quantity and set a delivery date of
                the remaining items.
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
              <TextField
                id="date"
                type="date"
                onChange={handleChange('deliveryBy')}
                className={classes.deliveryByInput}
                InputProps={{
                  disableUnderline: true,
                }}
              />
              <div className={classes.errorText}>{deliveryByError}</div>
            </Grid>
            <Grid className={classes.negotiationButtonWrapper}>
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
          </Grid>
        )}
      </Grid>
    </Paper>
  )
}

export default OrderDetail
