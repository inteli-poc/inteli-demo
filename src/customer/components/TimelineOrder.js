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
import TimelineAmendedItem from './TimelineAmendedItem'
import TimelineOrderConnector from './TimelineOrderConnector'
import TimelineOrderDot from './TimelineOrderDot'
import Certification from './Certification'
import {
  getStatusLabel,
  getMetadataTimestamp,
  getTimelineStatusIndex,
} from '../../utils/timeline'

const useStyles = makeStyles((theme) => ({
  timestamp: {
    float: 'right',
    color: theme.palette.primary.grey,
    fontWeight: '350',
  },
  timelineSeparator: {
    minHeight: '110px',
  },
  timelineRowContent: {
    marginBottom: '40px',
  },
}))

const renderTimelineItems = (order, classes) => {
  const {
    metadata: { status },
    history,
  } = order
  const { ammended, accepted } = orderStatus
  const renderAmmended = getMetadataTimestamp(history, 'status', ammended)
  const renderCertificates =
    getTimelineStatusIndex(status) >= getTimelineStatusIndex(accepted)
  const items = {
    submitted: {
      content: null,
    },
    ammended: renderAmmended 
      ? { content: <TimelineAmendedItem order={order} /> }
      : undefined,
    accepted: {
      content: renderCertificates && <Certification order={order} />,
    },
    manufacturing: {},
    manufactured: {},
  }

  return Object.entries(items).map(([key, { content }]) => (
    <>
      {key && <TimelineItem key={key}>
        <TimelineSeparator>
          <TimelineOrderDot latestStatus={status} rowStatus={key} />
          <TimelineOrderConnector latestStatus={status} rowStatus={key} />
        </TimelineSeparator>
        <Grid item sm={12}>
          <TimelineContent className={classes.timelineRowContent}>
            <Grid container alignItems="flex-start">
              <Grid item xs={9}>
                <Typography variant="h6">{getStatusLabel(key)}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography className={classes.timestamp}>
                  {getMetadataTimestamp(history, 'status', key)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
              {content}
              </Grid>
            </Grid>
          </TimelineContent>
          <TimelineOppositeContent />
        </Grid>
      </TimelineItem>}
    </>
  ))
}

const TimelineOrder = ({ order }) => {
  const classes = useStyles()

  return (
    <Grid container id={order.id} spacing={0}>
      <Grid item xs>
        <Timeline>{renderTimelineItems(order, classes)}</Timeline>
      </Grid>
    </Grid>
  )
}
export default TimelineOrder
