import * as React from 'react'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import { TimelineContent, TimelineOppositeContent } from '@mui/lab/'
import TimelineDot from '@mui/lab/TimelineDot'
import { Typography } from '@mui/material'
import { Container, Item } from '../../../shared/layout'

const statusLabels = [
  'Order placed',
  'Order accepted',
  'Test results',
  'Dispatched',
  'Delivered',
]

const VerticalTimeline = (props) => {
  let statusIndex = 0
  if (props.props === 'SubmittedOrder') {
    statusIndex = 1
  } else if (props.props === 'AcceptedOrder') {
    statusIndex = 2
  } else if (props.props === 'ManufacturedOrder') {
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

  return (
    <Container spacing={0}>
      <Item
        style={{}}
        sm={12}
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
      {/* <Item sm={3}>
        <div slyle={{ width: '100%', height: 100, backgroundColor: '#111341' }}>
          tsomesome somesome somesome somesome somesome somesome somesome
          extsome textsome textsome textsome text text
        </div>
      </Item>
      <Item sm={4}>
        <h1 slyle={{ backgroundColor: 'green' }}>
          somesome textsome textsome textsome textsome text text
        </h1>
      </Item> */}
    </Container>
  )
}
export default VerticalTimeline
