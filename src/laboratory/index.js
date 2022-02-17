import React from 'react'
import 'reset-css'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { Container, makeStyles } from '@material-ui/core'
import { BrowserRouter } from 'react-router-dom'

import Header from './components/Header'
import Router from './router'

const labTheme = createTheme({
  props: {
    MuiContainer: {
      maxWidth: 'xl',
    },
  },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 },
  },
  palette: {
    primary: {
      main: '#1F928B',
      dark: '#0F6661',
      contrastText: '#fff',
    },
    statusRequested: {
      main: '#f9cc8a',
    },
    statusSent: {
      main: '#cccccc',
    },
    statusFailed: {
      main: '#933434',
    },
    statusPassed: {
      main: '#8ec8c4',
    },
  },
})

const amLabTheme = createTheme({
  props: {
    MuiContainer: {
      maxWidth: 'xl',
    },
  },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 },
  },
  palette: {
    primary: {
      main: '#718c9f',
      dark: '#3a617e',
      contrastText: '#fff',
    },
    statusRequested: {
      main: '#f9cc8a',
    },
    statusSent: {
      main: '#cccccc',
    },
    statusFailed: {
      main: '#933434',
    },
    statusPassed: {
      main: '#8ec8c4',
    },
  },
})

const useStyles = makeStyles({
  root: {
    marginTop: '150px',
  },
})

const LaboratoryApp = ({ labType }) => {
  const classes = useStyles()

  const theme = labType === 'lab' ? labTheme : amLabTheme

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Header labType={labType} />
        <Container disableGutters className={classes.root}>
          <Router />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default LaboratoryApp
