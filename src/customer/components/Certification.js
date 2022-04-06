import React from 'react'
import { Button, Grid } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

import PDF from '../../utils/pdf'
import CertificationRow from './CertificationRow'

const pdfKit = new PDF()
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
    pdfKit.mergePDFs(files).then((url) => {
      console.log({ url })
      return url
      // include header file here
    })
  }

  React.useEffect(() => {
    const { requiredCerts } = order.metadata
    addFile(
      requiredCerts
        .map((cert) => {
          const { metadataKey } = cert
          const file = order.metadata[metadataKey]
          if (file) return file.url
          return null
        })
        .filter(Boolean)
    )
  }, [order.metadata])

  return (
    <Grid container className={classes.container}>
      <Grid container direction="row">
        {order.metadata.requiredCerts.map((cert) => {
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
          <Button onClick={(e) => downloadAllHandler(e)}>Download All</Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Certification
