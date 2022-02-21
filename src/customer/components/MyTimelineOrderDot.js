import React from 'react'
import TimelineDot from '@material-ui/lab/TimelineDot/TimelineDot'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  orangeDot: {
    backgroundColor: '#FF9900',
  },
  greyDot: {
    backgroundColor: '#CCCCCC',
  },
  redDot: {
    backgroundColor: '#fff',
    borderColor: '#C5052B',
  },
})

const MyTimelineOrderDot = ({ dotIndex, value, status }) => {
  const classes = useStyles()

  const Dot = {
    styling: classes.greyDot,
  }

  // Check the index status against the label array
  const GetDotColour = (dotIndex, value, status) => {
    if (status === 'amended') {
      Dot.styling = classes.redDot
    } else if (dotIndex >= value) {
      return (Dot.styling = classes.orangeDot)
    } else {
      return (Dot.styling = classes.greyDot)
    }
  }

  GetDotColour(dotIndex, value, status)
  return <TimelineDot className={Dot.styling} />
}

export default MyTimelineOrderDot
