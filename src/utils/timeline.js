import moment from 'moment'

import { orderStatus, statusLabels } from './statuses'

// Set the current status order. Again will eventually need updating with more states when they are added
const getTimelineStatusIndex = (status) => {
  switch (status) {
    case orderStatus.submitted:
      return 1
    case orderStatus.accepted:
      return 2
    case orderStatus.amended:
      return 2
    case orderStatus.manufacturing:
      return 3
    case orderStatus.manufactured:
      return 4
  }
}

const getStatusLabel = (index) => {
  return statusLabels[index]
}

const getTokenTimestampFormattedDate = (timestamp) =>
  moment(timestamp).format('DD-MM-YYYY hh:mm')

export {
  getTimelineStatusIndex,
  getStatusLabel,
  getTokenTimestampFormattedDate,
}
