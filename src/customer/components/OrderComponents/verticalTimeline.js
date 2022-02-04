import React from 'react'
import { Paper, Grid, Typography } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  orderDetailsHeading: {
    fontWeight: 600,
    paddingBottom: '50px',
  },
  inline: {
    display: 'inline',
  },
  paddingAbove: {
    paddingAbove: '50px',
  },
})

// const DetailRow = () => {
//   const classes = useStyles()
//   return (
//     <Box>
//       <Typography
//         className={classes.inline}
//         variant="subtitle1"
//         color="textSecondary"
//       >
//         Order Status
//       </Typography>
//     </Box>
//   )
// }

const VerticalTimeline = () => {
  const classes = useStyles()
  return (
    <Paper className={classes.root} elevation={0}>
      <Grid container className={classes.row}>
        <Grid container item xs={3}>
          <Typography
            className={classes.orderDetailsHeading}
            variant="subtitle1"
            color="textSecondary"
          >
            Order Status
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default VerticalTimeline
