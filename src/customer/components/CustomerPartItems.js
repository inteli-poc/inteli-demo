import React from 'react'
import CustomerPartItem from './CustomerPartItem'
import { Grid } from '@material-ui/core'

const CustomerPartItems = (props) => {
  const { items } = props

  return (
    <>
      {items.map((item) => (
        <Grid item key={item.partId}>
          <CustomerPartItem {...item} />
        </Grid>
      ))}
    </>
  )
}

export default CustomerPartItems
