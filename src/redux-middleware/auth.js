import jwtDecode from 'jwt-decode'

// TODO axios middle ware s fetching can be done within redu[[x
const {
    API_HOST,
    API_PORT,
    REACT_APP_AUTH_CLIENT_ID,
    REACT_APP_AUTH_CLIENT_SECRET
} = process.env
const url = `http://${API_HOST}:${API_PORT}/v2/auth`
const authReqParams = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
        'Content-Type': 'application/json',
    },
}

const isTokenValid = () => {
    // TODO move to app store
    const token = localStorage.getItem('token')
    if (!token) return false
    return jwtDecode(token).exp * 1000 > Date.now()
}


const getAuthToken = async () => {
    const body = { // replace with function args later or....
        client_id: REACT_APP_AUTH_CLIENT_ID,
        client_secret: REACT_APP_AUTH_CLIENT_SECRET,
    }
    // axios ...
    return fetch(url, { ...authReqParams, body });
}

const auth = (store) => (next) => (action) => {
    try {
        console.log('debug: ', { action, state: store.getState() })
        if (isTokenValid()) return next(action)
        localStorage.clear('token')
        getAuthToken().then(token => {
            //dispatch.saveTOken to the app and allow it to handle local storage
            localStorage.setItem('token', token.json().access_token)
            return next(action);
        })
    } catch (e) {
        // block action, reset state, and ..
        // dispatch a destruction action
        console.log('invalid token, not return next action')
    }
}

export default auth
