import React, { useState } from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'

const SearchField = () => {
    const [customerSearchPart, setCustomerSearchPart] = useState('')

    const handleChange = (event) => {
        setCustomerSearchPart(event.target.value)
    }

    return (
        <Wrapper>
            <TextField
                id="standard-full-width"
                placeholder="Search part number..."
                fullWidth
                onChange={handleChange}
                name="customerSearchPart"
                value={customerSearchPart}
            />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    padding: 8px 0px;
    width: 625px;
`

export default SearchField
