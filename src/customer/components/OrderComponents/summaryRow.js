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
    paddingBottom: '20px',
  },
  listItemMargin: {
    marginBottom: '60px',
  },
  datePadding: {
    paddingLeft: '103px',
    paddingTop: '5px',
  },
  root: {
    padding: 8,
    width: '100%',
    height: '100px',
    marginBottom: '25px',
    borderRadius: '8px',
    textDecoration: 'none',
  },
  isNotActive: {
    background: '#f8f8f8',
  },
  isActive: {
    background: '#fff',
  },
  fourHundFont: {
    fontWeight: '400',
  },
  threeFiftyFont: {
    fontWeight: '350',
  },
  dateColour: {
    color: '#868B92',
  },
  maherPadding: {
    paddingLeft: '25px',
  },
})

const SummaryRow = ({ setActiveItem, isActive, ...props }) => {
  const {
    id: orderId,
    metadata: {
      name: name,
      orderImage: image,
      deliveryBy: deliveryBy,
      quantity: quantity,
    },
  } = props.order
  const classes = useStyles()

  // Split the date so it can be formatted
  var parts = deliveryBy.split('/')
  var dt = new Date(
    parseInt(parts[2], 10),
    parseInt(parts[1], 10) - 1,
    parseInt(parts[0], 10)
  )

  // Format the date to dd mmm yyyy
  const formattedDate = dt
    .toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
    .replace(/ /g, ' ')

  return (
    <Paper
      id={orderId}
      elevation={0}
      className={`${classes.root}  ${
        isActive ? classes.isActive : classes.isNotActive
      }`}
    >
      <CardActionArea
        onClick={() => {
          setActiveItem(orderId)
        }}
        component={RouterLink}
        to={`/app/my-orders/${orderId}`}
      >
        <Grid container xs={12} className={classes.listItemMargin}>
          <Grid item xs={3}>
            <CardMedia
              component="img"
              alt={image.filename}
              width="160"
              image={image.url}
              title={image.filename}
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
            <Typography
              variant="subtitle2"
              component="h6"
              display="inline"
              className={`${classes.fourHundFont} ${classes.maherPadding}`}
            >
              Qnt: {quantity}
            </Typography>
            <Typography
              variant="subtitle2"
              component="h6"
              className={`${classes.datePadding} ${classes.threeFiftyFont} ${classes.dateColour} `}
            >
              {formattedDate}
            </Typography>
          </Grid>
        </Grid>
      </CardActionArea>
    </Paper>
  )
}

export default SummaryRow
