import * as React from 'react'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import { TimelineContent, TimelineOppositeContent } from '@mui/lab/'
import TimelineDot from '@mui/lab/TimelineDot'
import { Typography } from '@mui/material'
import { Container, Item } from '../../../shared/layout'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles({
  dateTime: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    float: 'right',
    color: '#868B92',
    fontWeight: '350',
  },
  time: {
    paddingLeft: '20px',
  },
})

// Inital labels to be used on the timeline, will need refactoring when alternatives are added
const statusLabels = [
  'Order placed',
  'Order accepted',
  'Certification',
  'Dispatched',
  'Delivered',
  'Amended',
]

const VerticalTimeline = ({ order }) => {
  const classes = useStyles()

  const {
    id: orderId,
    metadata: { deliveryBy: deliveryBy, status: type },
  } = order

  console.log('Order', order)
  console.log('Type', type)

  // Set the current status order. Again will eventually need updating with more states
  let statusIndex = 0
  if (type === 'submitted') {
    statusIndex = 1
  } else if (type === 'accepted') {
    statusIndex = 2
  } else if (type === 'manufactured') {
    statusIndex = 3
  } else if (type === 'manufacturing') {
    statusIndex = 4
  } else if (type === 'amended') {
    statusIndex = 2
  } else {
    statusIndex = 0
  }

  // Helper function to decide the colour of a timeline segment
  function GetColour(index, value) {
    if (index >= value) {
      return '#FF9900'
    } else {
      return '#CCCCCC'
    }
  }

  /*   const formattedDate = deliveryBy.split('/').join('-')
   */
  return (
    <Container id={orderId} spacing={0}>
      <Item
        style={{}}
        xs={10}
        sx={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
      >
        <Timeline>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                sx={{
                  backgroundColor: GetColour(statusIndex, 1),
                }}
              />
              <TimelineConnector
                sx={{
                  backgroundColor: GetColour(statusIndex, 1),
                }}
              />
            </TimelineSeparator>
            <Item>
              <TimelineContent>
                {' '}
                <Grid container alignItems="flex-start" xs={12}>
                  <Grid item xs={9}>
                    <Typography variant="h6">{statusLabels[0]}</Typography>
                  </Grid>
                  <Grid item xs={3} alignItems="flex-end">
                    <Typography
                      variant="subtitle1"
                      className={`${classes.dateTime} ${classes.time}`}
                    >
                      {deliveryBy}
                    </Typography>
                  </Grid>
                  <Grid item alignItems="flex-start">
                    <Typography
                      variant="subtitle1"
                      className={`${classes.dateTime} ${classes.time}`}
                    >
                      Content Goes here
                    </Typography>
                  </Grid>
                </Grid>
              </TimelineContent>
              <TimelineOppositeContent />
            </Item>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                sx={{
                  backgroundColor: GetColour(statusIndex, 2),
                }}
              />
              <TimelineConnector
                sx={{
                  backgroundColor: GetColour(statusIndex, 2),
                }}
              />
            </TimelineSeparator>
            <Item sm={12}>
              <TimelineContent>
                <Grid container alignItems="flex-start" xs={12}>
                  <Grid item xs={9}>
                    <Typography variant="h6">
                      {type === 'amended'
                        ? statusLabels[statusLabels.length - 1]
                        : statusLabels[1]}
                    </Typography>
                  </Grid>
                  <Grid item xs={3} alignItems="flex-end">
                    <Typography
                      variant="subtitle1"
                      className={`${classes.dateTime} ${classes.time}`}
                    >
                      {deliveryBy}
                    </Typography>
                  </Grid>
                  <Grid item alignItems="flex-start">
                    <Typography
                      variant="subtitle1"
                      className={`${classes.dateTime} ${classes.time}`}
                    >
                      Content Goes here
                    </Typography>
                  </Grid>
                </Grid>
              </TimelineContent>
            </Item>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                sx={{
                  backgroundColor: GetColour(statusIndex, 3),
                }}
              />
              <TimelineConnector
                sx={{
                  backgroundColor: GetColour(statusIndex, 3),
                }}
              />
            </TimelineSeparator>
            <Item>
              <TimelineContent>
                {' '}
                <Grid container alignItems="flex-start" xs={12}>
                  <Grid item xs={9}>
                    <Typography variant="h6">{statusLabels[2]}</Typography>
                  </Grid>
                  <Grid item xs={3} alignItems="flex-end">
                    <Typography
                      variant="subtitle1"
                      className={`${classes.dateTime} ${classes.time}`}
                    >
                      {deliveryBy}
                    </Typography>
                  </Grid>
                  <Grid item alignItems="flex-start">
                    <Typography
                      variant="subtitle1"
                      className={`${classes.dateTime} ${classes.time}`}
                    >
                      Content Goes here
                    </Typography>
                  </Grid>
                </Grid>
              </TimelineContent>
              <TimelineOppositeContent />
            </Item>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                sx={{
                  backgroundColor: GetColour(statusIndex, 4),
                }}
              />
              <TimelineConnector
                sx={{
                  backgroundColor: statusIndex >= 4 ? '#FF9900' : '#CCCCCC',
                }}
              />
            </TimelineSeparator>
            <Item>
              <TimelineContent>
                {' '}
                <Grid container alignItems="flex-start" xs={12}>
                  <Grid item xs={9}>
                    <Typography variant="h6">{statusLabels[3]}</Typography>
                  </Grid>
                  <Grid item xs={3} alignItems="flex-end">
                    <Typography
                      variant="subtitle1"
                      className={`${classes.dateTime} ${classes.time}`}
                    >
                      {deliveryBy}
                    </Typography>
                  </Grid>
                  <Grid item alignItems="flex-start">
                    <Typography
                      variant="subtitle1"
                      className={`${classes.dateTime} ${classes.time}`}
                    >
                      Content Goes here
                    </Typography>
                  </Grid>
                </Grid>
              </TimelineContent>
              <TimelineOppositeContent />
            </Item>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                sx={{
                  backgroundColor: GetColour(statusIndex, 5),
                }}
              />
            </TimelineSeparator>
            <Item>
              <TimelineContent>
                <Grid container alignItems="flex-start" xs={12}>
                  <Grid item xs={9}>
                    <Typography variant="h6">{statusLabels[4]}</Typography>
                  </Grid>
                  <Grid item xs={3} alignItems="flex-end">
                    <Typography
                      variant="subtitle1"
                      className={`${classes.dateTime} ${classes.time}`}
                    >
                      {deliveryBy}
                    </Typography>
                  </Grid>
                  <Grid item alignItems="flex-start">
                    <Typography
                      variant="subtitle1"
                      className={`${classes.dateTime} ${classes.time}`}
                    >
                      Content Goes here
                    </Typography>
                  </Grid>
                </Grid>
              </TimelineContent>
              <TimelineOppositeContent />
            </Item>
          </TimelineItem>
        </Timeline>
      </Item>
    </Container>
  )
}
export default VerticalTimeline
