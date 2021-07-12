import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles({
  inline: { display: 'inline' },
  row: { padding: '16px 30px 8px 30px' },
  underline: { borderBottom: '1px lightgrey solid', margin: '30px 0 5px' },
  bold: { fontWeight: 'bold', color: '#000' },
})

const LabTestRow = ({ title, value, bold }) => {
  const classes = useStyles()
  return (
    <Grid
      xs={12}
      className={classes.row + ' ' + (bold ? classes.underline : '')}
    >
      <Typography
        className={classes.inline + ' ' + (bold ? classes.bold : '')}
        variant="subtitle2"
      >
        {title}
      </Typography>
      &emsp;
      <Typography
        className={classes.inline + ' ' + (bold ? classes.bold : '')}
        color="textSecondary"
        variant="subtitle1"
      >
        {value}
      </Typography>
    </Grid>
  )
}

export default LabTestRow
