export const AUTH_DOMAIN =
  process.env.REACT_APP_AUTH_DOMAIN ||
  Window.config.inteli.authDomain ||
  'inteli.eu.auth0.com'

export const AUTH_CLIENT_ID =
  process.env.REACT_APP_AUTH_CLIENT_ID ||
  Window.config.inteli.clientID ||
  'A5PgyCfBMIOhHQEIyImtqLGuD1VJ9VgP'

export const AUTH_AUDIENCE =
  process.env.REACT_APP_AUTH_AUDIENCE ||
  Window.config.inteli.authAudience ||
  'inteli-dev'

export const API_SCHEME = Window.config.inteli.apiScheme || 'http'

export const API_HOST =
  process.env.REACT_APP_API_HOST || Window.config.inteli.apiHost || 'localhost'

export const API_PORT =
  process.env.REACT_APP_API_PORT || Window.config.inteli.apiPort || 3000

export const SUBSTRATE_HOST =
  process.env.REACT_APP_SUBSTRATE_HOST || Window.config.inteli.substrateHost

export const SUBSTRATE_PORT =
  process.env.REACT_APP_SUBSTRATE_PORT || Window.config.inteli.substratePort

export const INTELI_DEMO_PERSONA =
  process.env.REACT_APP_INTELI_DEMO_PERSONA ||
  Window.config.inteli.inteliDemoPersona

export const INTELI_CUST_IDENTITY =
  process.env.REACT_APP_INTELI_CUST_IDENTITY ||
  Window.config.inteli.inteliCustIdentity

export const INTELI_AM_IDENTITY =
  process.env.REACT_APP_INTELI_AM_IDENTITY ||
  Window.config.inteli.inteliAmIdentity

export const INTELI_LAB_IDENTITY =
  process.env.REACT_APP_INTELI_LAB_IDENTITY ||
  Window.config.inteli.inteliLabIdentity

export const INTELI_AMLAB_IDENTITY =
  process.env.REACT_APP_INTELI_AMLAB_IDENTITY ||
  Window.config.inteli.inteliAmlabIdentity
