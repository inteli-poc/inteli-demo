import React, { useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, Typography } from '@material-ui/core'

const useStyles = makeStyles({
  attachmentDownload: {
    color: '#000',
    textAlign: 'right',
  },
})

const Download = ({ name, downloadData }) => {
  const classes = useStyles()
  const [url, setURL] = useState('')

  useEffect(() => {
    const dataURItoObjectURL = (dataURI) => {
      if (!dataURI) {
        return ''
      } else {
        const [dataURIHeader, dataBase64] = dataURI.split(',')

        const byteString = atob(dataBase64)
        const mimeString = dataURIHeader.split(':')[1].split(';')[0]

        const ab = new ArrayBuffer(byteString.length)
        const ia = new Uint8Array(ab)

        for (let counter = 0; counter < byteString.length; counter++) {
          ia[counter] = byteString.charCodeAt(counter)
        }

        const blob = new Blob([ab], { type: mimeString })
        const url = URL.createObjectURL(blob)

        return url
      }
    }

    const url = dataURItoObjectURL(downloadData)
    setURL(url)

    return () => {
      URL.revokeObjectURL(url)
      setURL('')
    }
  }, [downloadData, setURL])

  return (
    <Box>
      <a href={url} download={name} className={classes.attachmentDownload}>
        <Typography variant="body2">Download PDF</Typography>
      </a>
    </Box>
  )
}

export default Download
