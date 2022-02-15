import jwtDecode from 'jwt-decode'
import axios from 'axios'

// TODO axios middle ware s fetching can be done within redu[[x
const {
  REACT_APP_API_HOST,
  REACT_APP_API_PORT,
  REACT_APP_AUTH_CLIENT_ID,
  REACT_APP_AUTH_CLIENT_SECRET,
} = process.env
const authReqParams = {
  url: `http://${REACT_APP_API_HOST}:${REACT_APP_API_PORT}/v2/auth`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  data: {
    client_id: REACT_APP_AUTH_CLIENT_ID,
    client_secret: REACT_APP_AUTH_CLIENT_SECRET,
  }
}

const isTokenValid = () => {
  // TODO move to redux store
  // have one reducer for app's state 
  const token = localStorage.getItem('token')
  if (!token || token === 'undefined') return false
  return jwtDecode(token).exp * 1000 > Date.now()
}

const auth = (store) => (next) => (action) => {
  try {
    console.log('debug: <auth> ', { action, state: store.getState() })

    if (isTokenValid()) return next(action)
    localStorage.clear('token')

    axios(authReqParams).then(({ data }) => {
      localStorage.setItem('token', data.access_token)
      return next(action)
    })
  } catch (e) {
    localStorage.clear('token')
    console.log('invalid token, not returning next action', e)
  }
}

export default auth
