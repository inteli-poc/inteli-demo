import jwtDecode from 'jwt-decode'

const API_HOST = process.env.REACT_APP_API_HOST || 'localhost'
const API_PORT = process.env.REACT_APP_API_PORT || '3001'

const wrappedFetch = (url, options) =>
  fetch(url, options).then((res) => res.json())

const useNewFetchWrapper = () => {
  const newWrappedFetch = async (url, options) => {
    let response = await fetch(url, options)

    const contentType = response.headers.get('content-type')
    switch (contentType) {
      case 'application/json; charset=utf-8':
        return response.json()
      case 'text/plain; charset=utf-8':
        return response.text()
      case 'application/octet-stream': {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const fileName = response.headers
          .get('content-disposition')
          .split('filename=')[1]
          .replace(/['"]/g, '')

        return {
          url: url,
          fileName: fileName,
        }
      }
      default:
        return response.json()
    }
  }
  return newWrappedFetch
}

// TODO: convert into a middleware - matt?
// e.g. for all routes ../v2*
const checkJwt = (token) => {
  if (!token) return false
  try {
    const decoded = jwtDecode(token)
    const hasExpired = decoded.exp * 1000 < Date.now()
    return !hasExpired
  } catch (err) {
    return false
  }
}

const useApi = () => {
  const newWrappedFetch = useNewFetchWrapper()
  const getAuthToken = async () => {
    const token = localStorage.getItem('token')
    // TODO: once middleware is there this could be abstracted
    if (!checkJwt(token)) {
      localStorage.clear('token')
      const response = await wrappedFetch(
        `http://${API_HOST}:${API_PORT}/v2/auth`,
        {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: process.env.REACT_APP_AUTH_CLIENT_ID,
            client_secret: process.env.REACT_APP_AUTH_CLIENT_SECRET,
          }),
        }
      )

      localStorage.setItem('token', response.access_token)
      return response.access_token
    }
    return token
  }

  const runProcess = async (body) =>
    wrappedFetch(`http://${API_HOST}:${API_PORT}/v2/run-process`, {
      method: 'POST',
      mode: 'cors',
      body,
      headers: {
        Authorization: `Bearer ${await getAuthToken()}`,
      },
    })

  const latestToken = async () => {
    return await wrappedFetch(`http://${API_HOST}:${API_PORT}/v2/last-token`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${await getAuthToken()}`,
      },
    })
  }
  const tokenById = async (id) => {
    const token = await wrappedFetch(
      `http://${API_HOST}:${API_PORT}/v2/item/${id}`,
      {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          Authorization: `Bearer ${await getAuthToken()}`,
        },
      }
    )
    console.log({ token })
    // temporary catch old style metadata
    if (token.metadata_keys.includes('')) {
      return {
        ...token,
        metadata: await wrappedFetch(
          `http://${API_HOST}:${API_PORT}/v2/item/${id}/metadata`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
              Authorization: `Bearer ${await getAuthToken()}`,
            },
          }
        )
      }
    } else {
      return {
        ...token,
        metadata:
        await getNewMetadata(token)
      }
    }
  }

  const getNewMetadata = async (token) => {
    // recursive function?
    const metadata = {};
    await Promise.all(
      token.metadata_keys.map(async (metadata_key) => {
        metadata[metadata_key] = await newWrappedFetch(
          `http://${API_HOST}:${API_PORT}/v2/item/${token.id}/metadata/${metadata_key}`,
          {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
              Authorization: `Bearer ${await getAuthToken()}`,
            },
          }
        )
      })
    )
    return metadata
  }

  return { runProcess, latestToken, tokenById }
}

export default useApi
