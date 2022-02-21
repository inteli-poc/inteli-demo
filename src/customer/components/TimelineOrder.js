import React from 'react'
import Timeline from '@material-ui/lab/Timeline/Timeline'
import TimelineItem from '@material-ui/lab/TimelineItem/TimelineItem'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator/TimelineSeparator'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent/TimelineOppositeContent'
import { Typography } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Grid } from '@material-ui/core'

import { orderStatus } from '../../utils/statuses'
import AmendedTimeLineItem from './AmendedTimelineItem'
import TimelineOrderConnector from './TimelineOrderConnector'
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

const TimelineOrder = ({ order }) => {
  const classes = useStyles()

  const {
    id: orderId,
    metadata: { status },
    timestamp,
  } = order

  console.log(order)

  const tokenTimestampFormattedDate = getTokenTimestampFormattedDate(timestamp)

  return (
    <Grid container id={orderId} spacing={0}>
      <Grid item xs>
        <Timeline>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineOrderDot row={1} status={status} />
              <TimelineOrderConnector row={1} status={status} />
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
          <TimelineItem>
            <TimelineSeparator className={classes.columnMinHeight}>
              <TimelineOrderDot row={2} status={status} />
              <TimelineOrderConnector row={2} status={status} />
            </TimelineSeparator>
            <Grid item sm={12}>
              <TimelineContent>
                <Grid container alignItems="flex-start">
                  <Grid item xs={9}>
                    <Typography variant="h6">
                      {status === 'amended'
                        ? getStatusLabel(5)
                        : getStatusLabel(1)}
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
              <TimelineOrderDot row={3} status={status} />
              <TimelineOrderConnector row={3} status={status} />
            </TimelineSeparator>
            <Grid item sm={12}>
              <TimelineContent>
                {' '}
                <Grid container alignItems="flex-start">
                  <Grid item xs={9}>
                    <Typography variant="h6">{getStatusLabel(2)}</Typography>
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
              <TimelineOrderDot row={4} status={status} />
              <TimelineOrderConnector row={4} status={status} />
            </TimelineSeparator>
            <Grid item sm={12}>
              <TimelineContent>
                {' '}
                <Grid container alignItems="flex-start">
                  <Grid item xs={9}>
                    <Typography variant="h6">{getStatusLabel(3)}</Typography>
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
              <TimelineOrderDot row={5} status={status} />
            </TimelineSeparator>
            <Grid item sm={12}>
              <TimelineContent>
                <Grid container alignItems="flex-start">
                  <Grid item xs={9}>
                    <Typography variant="h6">{getStatusLabel(4)}</Typography>
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
        </Timeline>
      </Grid>
    </Grid>
  )
}
export default TimelineOrder
