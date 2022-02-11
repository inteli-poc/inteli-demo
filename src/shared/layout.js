import React from 'react'
import { Grid } from '@material-ui/core'

// Started with Paul to try and create a standard layout item to fix the timeline
// TODO refactor
export const Container = (props) => (
  <Grid container direction="row" {...props} />
)

export const Item = ({ row, ...props }) => (
  <Grid sm={12} direction={row ? 'row' : 'column'} {...props} />
)
