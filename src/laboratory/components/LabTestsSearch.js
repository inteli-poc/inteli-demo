import React, { useState } from 'react'
import { Container, makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import { NavLink } from 'react-router-dom'

import images from '../../images'

const useStyles = makeStyles({
    searchWrapper: {
        marginTop: '60px',
        marginBottom: '20px',
        height: '60px',
        padding: '4px',
    },
    search: {
        width: '97%',
    },
    closeWrapper: {
        marginLeft: '0px',
        marginTop: '12px',
        width: '16px',
        '& img': {
            verticalAlign: 'middle',
            marginTop: '10px',
        },
    },
})

const LabTestsSearch = () => {
    const [labSearchField, setLabSearchField] = useState('')
    const handleChange = (event) => {
        setLabSearchField(event.target.value)
    }
    const handleClick = (event) => {
        event.preventDefault()
        setLabSearchField('')
    }
    const classes = useStyles()
    return (
        <Container className={classes.searchWrapper}>
            <TextField
                id="standard-full-width"
                placeholder="Search samples..."
                className={classes.search}
                onChange={handleChange}
                value={labSearchField}
            />
            <NavLink
                to="#"
                onClick={handleClick}
                className={classes.closeWrapper}
            >
                <img src={images.closeXIcon} alt=""></img>
            </NavLink>
        </Container>
    )
}

export default LabTestsSearch
