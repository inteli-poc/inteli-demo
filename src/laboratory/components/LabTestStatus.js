import React from 'react'
import { Typography, Box } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles((theme) => ({
  status: {
    width: '16ch',
    height: '3ch',
    borderRadius: '12px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    color: 'white',
  },
  statusRequested: {
    background: theme.palette.statusRequested.main,
  },
  statusSent: {
    background: theme.palette.statusSent.main,
  },
  statusFailed: {
    background: theme.palette.statusFailed.main,
  },
  statusPassed: {
    background: theme.palette.statusPassed.main,
  },
}))

const LabTestStatus = ({ labTestStatus }) => {
  const classes = useStyles()
  let statusText = null
  let statusClass = null
  switch (labTestStatus) {
    case 'requested':
      statusText = 'Requested'
      statusClass = `${classes.status} ${classes.statusRequested}`
      break
    case 'sent':
      statusText = 'Sent'
      statusClass = `${classes.status} ${classes.statusSent}`
      break
    case 'failed':
      statusText = 'Failed'
      statusClass = `${classes.status} ${classes.statusFailed}`
      break
    case 'tested':
      statusText = 'Tested'
      statusClass = `${classes.status} ${classes.statusPassed}`
      break
    default:
      statusText = 'Requested'
      statusClass = `${classes.status} ${classes.statusRequested}`
      break
  }
  return (
    <Box className={statusClass}>
      <Typography>{statusText}</Typography>
    </Box>
  )
}

export default LabTestStatus
