const vars = {
  AUTH_DOMAIN: process.env.REACT_APP_AUTH_DOMAIN || 'inteli.eu.auth0.com',
  AUTH_CLIENT_ID:
    process.env.REACT_APP_AUTH_CLIENT_ID || 'BvJaBbxOce4Pwi5PZpjBTStvNWwzugPd',
  AUTH_AUDIENCE: process.env.REACT_APP_AUTH_AUDIENCE || 'inteli-dev',
  API_HOST: process.env.REACT_APP_API_HOST || 'localhost',
  API_PORT: process.env.REACT_APP_API_PORT || 3001,
}

export default { ...vars }
