import React from 'react'
import { Typography, Box, makeStyles } from '@material-ui/core'

import NetworkStatusIndicator from './NetworkStatusIndicator'

const useStyles = makeStyles({
  header: {
    marginBottom: '100px',
    display: 'flex',
    '& h4': {
      marginRight: 'auto',
    },
  },
})

const Header = ({ title }) => {
  const classes = useStyles()

  return (
    <Box className={classes.header}>
      <Typography variant="h4" component="h4">
        {title}
      </Typography>
      <NetworkStatusIndicator />
    </Box>
  )
}

export default Header
