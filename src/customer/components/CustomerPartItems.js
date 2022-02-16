import React from 'react'
import CustomerPartItem from './CustomerPartItem'
import { Grid } from '@material-ui/core'

const CustomerPartItems = ({ items }) => {
  return (
    <Grid
      container
      item
      direction="row"
      spacing={2}
      justifyContent="flex-start"
    >
      {items.map((item) => (
        <Grid item key={item.partId}>
          <CustomerPartItem {...item} />
        </Grid>
      ))}
    </Grid>
  )
}

export default CustomerPartItems
