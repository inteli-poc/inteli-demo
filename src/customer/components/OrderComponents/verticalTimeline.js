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

const statusLabels = [
  'Order placed',
  'Order accepted',
  'Test results',
  'Dispatched',
  'Delivered',
]

const VerticalTimeline = (props) => {
  const classes = useStyles()

  const deliveryBy = props.props.deliveryBy
  const time = props.props.time
  const type = props.props.type

  console.log('Props', deliveryBy)
  console.log('Props', time)
  console.log('Props', type)

  let statusIndex = 0
  if (type === 'SubmittedOrder') {
    statusIndex = 1
  } else if (type === 'AcceptedOrder') {
    statusIndex = 2
  } else if (type === 'ManufacturedOrder') {
    statusIndex = 3
  } else {
    statusIndex = 0
  }

  function GetColour(index, value) {
    if (index >= value) {
      return '#FF9900'
    } else {
      return '#CCCCCC'
    }
  }

  const formattedDate = deliveryBy.split('/').join('-')

  return (
    <Container spacing={0}>
      <Item
        style={{}}
        xs={10}
        sx={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }} /* container column size of 4/12 */
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
                <Typography variant="h6">{statusLabels[0]}</Typography>
                {/*
                  Date and time goes first in content
                */}
                <Typography
                  variant="subtitle1"
                  className={`${classes.dateTime} ${classes.time}`}
                >
                  {time}
                </Typography>
                <Typography variant="subtitle1" className={classes.dateTime}>
                  {formattedDate}
                </Typography>
                {/*
                Content
              */}
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
                <Typography variant="h6">{statusLabels[1]}</Typography>
                {/*
                Content
              */}
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
                <Typography variant="h6">{statusLabels[2]}</Typography>
                {/*
                Content
              */}
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
                <Typography variant="h6">{statusLabels[3]}</Typography>
                {/*
                Content
              */}
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
                {' '}
                <Typography variant="h6">{statusLabels[4]}</Typography>
                {/*
                Content
              */}
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
