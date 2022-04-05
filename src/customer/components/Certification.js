import React from 'react'
import { Button, Grid } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

import CertificationRow from './CertificationRow'

const useStyles = makeStyles({
  container: {
    padding: '24px 0px',
  },
})

const Certification = ({ order }) => {
  const classes = useStyles()
  const [files, addFile] = React.useState([])

  const downloadAllHandler = (e) => {
    e.preventDefault()
    console.log('downloadAllHandler')
    console.log(files)
  } 

  return (
    <Grid container className={classes.container}>
      <Grid container direction="row">
        {order.metadata.requiredCerts.map((cert) => {
          const { metadataKey } = cert
          addFile([
            ...files,
            order.metadata[metadataKey].url,
          ])
          return (
            <CertificationRow
              key={cert.metadataKey}
              order={order}
              requiredCert={cert}
            />
          )
        })}
      </Grid>
      <Grid justifyContent="flex-end" container direction="row">
        <Grid item sx={3}>
          <Button onClick={downloadAllHandler}>Download All</Button>
        </Grid>
        <Grid item sx={3}>
          <hi>Testing....</hi>
        </Grid> 
      </Grid>
    </Grid>
  )
}

export default Certification
