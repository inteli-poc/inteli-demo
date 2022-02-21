import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import TimelineConnector from '@material-ui/lab/TimelineConnector/TimelineConnector'

const useStyles = makeStyles({
  orangeLine: {
    backgroundColor: '#FF9900',
  },
  greyLine: {
    backgroundColor: '#CCCCCC',
  },
  rejectedLine: {
    backgroundColor: '#bdbdbd',
  },
})

const MyTimelineConnector = ({ lineIndex, value, status }) => {
  const classes = useStyles()

  const Dot = {
    styling: classes.greyLine,
  }

  // Check the index status against the label array
  const GetLineColour = (lineIndex, value, status) => {
    if (status === 'amended') {
      Dot.styling = classes.rejectedLine
    } else if (lineIndex >= value) {
      return (Dot.styling = classes.orangeLine)
    } else {
      return (Dot.styling = classes.greyLine)
    }
  }

  GetLineColour(lineIndex, value, status)

  return <TimelineConnector className={Dot.styling} />
}

export default MyTimelineConnector
