/* eslint-disable */
import React from 'react'
import Timeline from '@material-ui/lab/Timeline/Timeline'
import TimelineItem from '@material-ui/lab/TimelineItem/TimelineItem'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator/TimelineSeparator'
import TimelineConnector from '@material-ui/lab/TimelineConnector/TimelineConnector'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent/TimelineOppositeContent'
//import TimelineDot from '@material-ui/lab/TimelineDot/TimelineDot'
import { Typography } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Grid } from '@material-ui/core'
import moment from 'moment'
import { orderStatus } from '../../utils/statuses'
import AmendedTimeLineItem from './AmendedTimelineItem'
import MyTimelineConnector from './MyTimelineConnector'
import TimelineOrderDot from './TimelineOrderDot'
import {
  getStatusLabel,
  getTokenTimestampFormattedDate,
} from '../../utils/timeline'

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
  columnMinHeight: {
    minHeight: '110px',
  },
  timelineRowContent: {
    padding: '20px 0px 40px 0px',
  },
  actionRowWarning: {
    color: '#C5052B',
    fontWeight: '700',
    paddingBottom: '15px',
    paddingTop: '40px',
  },
  rejectedWarningBox: {
    backgroundColor: '#ff003308',
    minHeight: '150px',
    borderLeft: '3px solid #C5052B',
    marginBottom: '60px',
  },
  proposedQuantity: {
    padding: '32px 40px 8px ',
  },
  proposedDeliveryDate: {
    paddingTop: '32px',
    paddingLeft: '40px',
  },
  proposedTextStyle: {
    fontWeight: '700',
    fontSize: '16px',
    lineHeight: '18.75px',
    paddingBottom: '8px',
  },
  acceptProposedButton: {
    backgroundColor: '#17AE93',
    color: '#fff',
    width: '125px',
    marginBottom: '15px',
  },
  rejectProposedButton: {
    backgroundColor: '#CCCCCC',
    color: '#fff',
    width: '125px',
  },
})

const VerticalTimeline = ({ order }) => {
  const classes = useStyles()

  const {
    id: orderId,
    metadata: { status },
    timestamp,
  } = order

  console.log(order)

  const tokenTimestampFormattedDate = getTokenTimestampFormattedDate(timestamp)

  // Helper function to decide the colour of a timeline segment
  // const getTimelineColour = (index, value) => {
  //   if (index >= value) {
  //     return '#FF9900'
  //   } else {
  //     return '#CCCCCC'
  //   }
  // }

  return (
    <Grid container id={orderId} spacing={0}>
      <Grid item xs>
        <Timeline>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineOrderDot row={1} status={status} />
              {/*<MyTimelineConnector*/}
              {/*  lineIndex={statusIndex}*/}
              {/*  value={1}*/}
              {/*  status={status}*/}
              {/*/>*/}
              {/*<TimelineConnector*/}
              {/*  style={{*/}
              {/*    backgroundColor: `${*/}
              {/*      status === 'amended'*/}
              {/*        ? '#bdbdbd'*/}
              {/*        : getTimelineColour(statusIndex, 1)*/}
              {/*    }`,*/}
              {/*  }}*/}
              {/*/>*/}
            </TimelineSeparator>
            <Grid item sm={12}>
              <TimelineContent>
                <Grid container alignItems="flex-start">
                  <Grid item xs={9}>
                    <Typography variant="h6">{getStatusLabel(0)}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      className={`${classes.dateTime} ${classes.time}`}
                    >
                      {tokenTimestampFormattedDate}
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography
                      className={classes.timelineRowContent}
                      variant="subtitle1"
                    ></Typography>
                  </Grid>
                </Grid>
              </TimelineContent>
              <TimelineOppositeContent />
            </Grid>
          </TimelineItem>
          {/*<TimelineItem>
            <TimelineSeparator className={classes.columnMinHeight}>
              <MyTimelineOrderDot
                dotIndex={statusIndex}
                value={2}
                status={status}
              />
              <TimelineConnector
                style={{
                  backgroundColor: `${
                    status === 'amended'
                      ? '#bdbdbd'
                      : getTimelineColour(statusIndex, 2)
                  }`,
                }}
              />
            </TimelineSeparator>
            <Grid item sm={12}>
              <TimelineContent>
                <Grid container alignItems="flex-start">
                  <Grid item xs={9}>
                    <Typography variant="h6">
                      {status === 'amended'
                        ? statusLabels[statusLabels.length - 1]
                        : statusLabels[1]}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      className={`${classes.dateTime} ${classes.time}`}
                    >
                      {tokenTimestampFormattedDate}
                    </Typography>
                  </Grid>
                  {status === orderStatus.amended && (
                    <AmendedTimeLineItem order={order} />
                  )}
                </Grid>
              </TimelineContent>
            </Grid>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <MyTimelineOrderDot
                dotIndex={statusIndex}
                value={3}
                status={status}
              />
              <TimelineConnector
                style={{
                  backgroundColor: `${getTimelineColour(statusIndex, 3)}`,
                }}
              />
            </TimelineSeparator>
            <Grid item sm={12}>
              <TimelineContent>
                {' '}
                <Grid container alignItems="flex-start">
                  <Grid item xs={9}>
                    <Typography variant="h6">{statusLabels[2]}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      className={`${classes.dateTime} ${classes.time}`}
                    >
                      {tokenTimestampFormattedDate}
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography
                      className={classes.timelineRowContent}
                      variant="subtitle1"
                    ></Typography>
                  </Grid>
                </Grid>
              </TimelineContent>
              <TimelineOppositeContent />
            </Grid>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <MyTimelineOrderDot
                dotIndex={statusIndex}
                value={4}
                status={status}
              />
              <TimelineConnector
                style={{
                  backgroundColor: `${getTimelineColour(statusIndex, 4)}`,
                }}
              />
            </TimelineSeparator>
            <Grid item sm={12}>
              <TimelineContent>
                {' '}
                <Grid container alignItems="flex-start">
                  <Grid item xs={9}>
                    <Typography variant="h6">{statusLabels[3]}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      className={`${classes.dateTime} ${classes.time}`}
                    >
                      {tokenTimestampFormattedDate}
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography
                      className={classes.timelineRowContent}
                      variant="subtitle1"
                    ></Typography>
                  </Grid>
                </Grid>
              </TimelineContent>
              <TimelineOppositeContent />
            </Grid>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <MyTimelineOrderDot
                dotIndex={statusIndex}
                value={5}
                status={status}
              />
            </TimelineSeparator>
            <Grid item sm={12}>
              <TimelineContent>
                <Grid container alignItems="flex-start">
                  <Grid item xs={9}>
                    <Typography variant="h6">{statusLabels[4]}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      className={`${classes.dateTime} ${classes.time}`}
                    >
                      {tokenTimestampFormattedDate}
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography
                      className={classes.timelineRowContent}
                      variant="subtitle1"
                    ></Typography>
                  </Grid>
                </Grid>
              </TimelineContent>
              <TimelineOppositeContent />
            </Grid>
          </TimelineItem>*/}
        </Timeline>
      </Grid>
    </Grid>
  )
}
export default VerticalTimeline
