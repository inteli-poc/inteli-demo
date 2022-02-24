import { useAuth0 } from '@auth0/auth0-react'

import { AUTH_AUDIENCE, API_HOST, API_PORT } from './env.js'

const useFetchWrapper = () => {
  const dispatch = useDispatch()

  const wrappedFetch = async (url, options) => {
    let response
    try {
      response = await fetch(url, options)
      if (response.ok) {
        dispatch(updateNetworkStatus(true))
      } else {
        dispatch(updateNetworkStatus(false))
      }
    } catch (err) {
      dispatch(updateNetworkStatus(false))
      throw err
    }

    const contentType = response.headers.get('content-type')
    switch (contentType) {
      case 'application/json; charset=utf-8':
        return response.json()
      case 'text/plain; charset=utf-8':
        return response.text()
      case 'application/octet-stream': {
        const blob = await response.blob()
        const appBlob = new Blob([blob], { type: 'application' })
        const url = URL.createObjectURL(appBlob)
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
  return wrappedFetch
}

const useApi = () => {
  const { getAccessTokenSilently } = useAuth0()

  const getAuthToken = async () => {
    return await getAccessTokenSilently({
      audience: AUTH_AUDIENCE,
      scope: '',
    })
  }
  const wrappedFetch = useFetchWrapper()

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

    return {
      ...token,
      metadata: await getMetadata(token.id, token.metadata_keys),
    }
  }

  const getMetadata = async (token) => {
    // recursive function?
    const metadata = {}
    await Promise.all(
      token.metadata_keys.map(async (metadata_key) => {
        metadata[metadata_key] = await newWrappedFetch(
          `http://${API_HOST}:${API_PORT}/v2/item/${token.id}/metadata/${metadata_key}`,
          {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
              Authorization: `Bearer ${getAuthToken()}`,
            },
          }
        )
      })
    )
  }

  const getMetadataValue = async (id, metadataKey) => {
    return await wrappedFetch(
      `http://${API_HOST}:${API_PORT}/v2/item/${id}/metadata/${metadataKey}`,
      {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          Authorization: `Bearer ${await getAuthToken()}`,
        },
      }
    )
  }

  return { runProcess, latestToken, tokenById }
}

export default useApi
