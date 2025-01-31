import React, { useState } from 'react'
import {
  Paper,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  CircularProgress,
  Box,
  Container,
} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import BackButton from './BackButton'
import { upsertOrder } from '../../features/ordersSlice'
import {
  useApi,
  identities,
  tokenTypes,
  metadataTypes,
  orderStatus,
} from '../../utils'
import Attachment from '../../am/components/Attachment'
import OrderQuantityInput from '../../shared/OrderQuantityInput'
import OrderDeliveryByDatePicker from '../../shared/OrderDeliveryByDatePicker'
import { isDeliveryByInvalid, isQuantityInvalid } from '../../utils/forms'

const useStyles = makeStyles((theme) => ({
  card: {
    padding: '24px',
    width: '100%',
  },
  contentDetails: {
    position: 'relative',
    borderRight: '1px #d3d3d3 solid',
    margin: '0px 24px',
    padding: '0px 24px',
  },
  backButton: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
  issuePurchaseOrderButton: {
    width: 230,
    height: 42,
  },
  inline: {
    display: 'inline',
  },
  rightColumn: {
    padding: '64px 0px 112px 16px',
  },
  rightColumnBottom: {
    marginTop: '96px',
  },
  partTitle: {
    fontSize: '1.4rem',
    fontWeight: '600',
    marginBottom: '32px',
  },
  shippingAddress: {
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '16px',
  },
  orderForm: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  },
}))

const DetailRow = ({ title, value }) => {
  const classes = useStyles()
  return (
    <Box>
      <Typography className={classes.inline} variant="body1">
        {title}:
      </Typography>
      &nbsp;
      <Typography
        className={classes.inline}
        variant="body2"
        color="textSecondary"
      >
        {value}
      </Typography>
    </Box>
  )
}

const CustomerPart = () => {
  const { partId: id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isOrdering, setIsOrdering] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [quantityError, setQuantityError] = useState('')
  const [deliveryBy, setDeliveryBy] = useState('')
  const [deliveryByError, setDeliveryByError] = useState('')

  const selectedCustomerPart = useSelector((state) =>
    state.customerParts.find(({ partId }) => partId === id)
  )

  const api = useApi()

  const { image, name, material, alloy, price, partId, requiredCerts } =
    selectedCustomerPart
  const totalCost = price * quantity
  const classes = useStyles()

  const createFormData = (
    inputs,
    roles,
    metadata,
    orderImageFile,
    requiredCertsFile
  ) => {
    const formData = new FormData()
    const outputs = [
      {
        roles,
        metadata: {
          type: { type: metadataTypes.literal, value: metadata.type },
          status: { type: metadataTypes.literal, value: metadata.status },
          orderReference: {
            type: metadataTypes.literal,
            value: metadata.orderReference,
          },
          partId: { type: metadataTypes.literal, value: metadata.partId },
          name: { type: metadataTypes.literal, value: metadata.name },
          material: { type: metadataTypes.literal, value: metadata.material },
          alloy: { type: metadataTypes.literal, value: metadata.alloy },
          price: { type: metadataTypes.literal, value: metadata.price },
          quantity: { type: metadataTypes.literal, value: metadata.quantity },
          deliveryBy: {
            type: metadataTypes.literal,
            value: metadata.deliveryBy,
          },
          orderImage: {
            type: metadataTypes.file,
            value: metadata.orderImage.fileName,
          },
          requiredCerts: {
            type: metadataTypes.file,
            value: metadata.requiredCerts.fileName,
          },
        },
      },
    ]

    formData.set(
      'request',
      JSON.stringify({
        inputs,
        outputs,
      })
    )

    formData.append('files', orderImageFile.blob, orderImageFile.fileName)
    formData.append('files', requiredCertsFile.blob, requiredCertsFile.fileName)

    return formData
  }

  const createOrderImageFile = async (image) => {
    const response = await fetch(image)
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    return {
      blob,
      fileName: 'orderImage.svg',
      url,
    }
  }

  const createCertsFile = async (requiredCerts) => {
    const blob = new Blob([JSON.stringify(requiredCerts)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    return {
      blob,
      fileName: 'requiredCertifications.json',
      url,
    }
  }

  const onChange = async () => {
    if (isFormReady()) {
      setIsOrdering(true)

      const orderImageFile = await createOrderImageFile(image)
      const requiredCertsFile = await createCertsFile(requiredCerts)

      const roles = { Owner: identities.am }
      const metadata = {
        type: tokenTypes.order,
        status: orderStatus.submitted,
        orderReference: `#${Math.floor(Math.random() * 100000000)}`,
        partId,
        name,
        material,
        alloy,
        price: price.toString(),
        quantity: quantity.toString(),
        deliveryBy,
        orderImage: {
          fileName: orderImageFile.fileName,
          url: orderImageFile.url,
        },
        requiredCerts: {
          fileName: requiredCertsFile.fileName,
          url: requiredCertsFile.url,
        },
      }

      const formData = createFormData(
        [],
        roles,
        metadata,
        orderImageFile,
        requiredCertsFile
      )
      const response = await api.runProcess(formData)
      const token = {
        id: response[0],
        original_id: response[0],
        roles,
        metadata,
      }

      dispatch(upsertOrder(token))

      navigate('/app/my-orders')
    }
  }

  const setQuantityValue = (value) => {
    const quantityValue = value.replace(/\D/g, '')

    setQuantityError(isQuantityInvalid(quantityValue))
    setQuantity(parseInt(quantityValue, 10) || quantityValue)
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
    return !isQuantityInvalid(quantity) && !isDeliveryByInvalid(deliveryBy)
  }

  return (
    <Container>
      <BackButton
        buttonClass={classes.backButton}
        backToLocation="/app/customer-parts"
        value="< Back"
      />

      <Paper elevation={0} className={classes.card}>
        <Grid container>
          <Grid item xs={3}>
            <CardMedia
              component="img"
              alt={name}
              width="450"
              height="322"
              image={image}
              title={name}
            />
          </Grid>
          <Grid
            container
            item
            xs={6}
            direction="column"
            justifyContent="space-between"
            className={classes.contentDetails}
          >
            <CardContent>
              <Typography gutterBottom className={classes.partTitle}>
                {name}
              </Typography>
              <DetailRow title="Part name" value={name}></DetailRow>
              <DetailRow title="Part Number" value={id}></DetailRow>
              <DetailRow title="Material" value={material}></DetailRow>
              <DetailRow title="Alloy" value={alloy}></DetailRow>
            </CardContent>

            <CardContent className={classes.orderForm}>
              <OrderQuantityInput
                handleChange={handleChange}
                label="Quantity"
                quantity={quantity}
                errorMessage={quantityError}
              />

              <OrderDeliveryByDatePicker
                handleChange={handleChange}
                label="Delivery date"
                errorMessage={deliveryByError}
              />
            </CardContent>
            <CardContent>
              <Attachment name="Materials.pdf" />
              <Attachment name="Requirements.pdf" />
              <Attachment name="CAD" />
            </CardContent>
          </Grid>
          <Grid
            container
            item
            xs={2}
            direction="column"
            justifyContent="space-between"
            className={classes.rightColumn}
          >
            <Typography variant="h6">&#163;{totalCost}</Typography>
            <Box className={classes.rightColumnBottom}>
              <Typography className={classes.shippingAddress}>
                Shipping Address:
              </Typography>
              <Typography color="textSecondary">Digital Catapult</Typography>
              <Typography color="textSecondary">101 Euston Road</Typography>
              <Typography color="textSecondary">London</Typography>
              <Typography color="textSecondary">NW1 2RA</Typography>
            </Box>
            <Button
              size="medium"
              variant="contained"
              color="primary"
              className={classes.issuePurchaseOrderButton}
              onClick={isOrdering ? null : onChange}
              disabled={!isFormReady()}
            >
              {isOrdering ? (
                <CircularProgress color="secondary" size="30px" />
              ) : (
                'ISSUE PURCHASE ORDER'
              )}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default CustomerPart
