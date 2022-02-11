import Button from '@material-ui/core/Button'
import { NavLink } from 'react-router-dom'
import React from 'react'

const BackButton = (props) => {
  const { buttonClass, backToLocation, value } = props

  return (
    <Button>
      <NavLink to={backToLocation} className={buttonClass}>
        {value}
      </NavLink>
    </Button>
  )
}

export default BackButton
