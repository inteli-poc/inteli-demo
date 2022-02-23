const envalid = require('envalid')

const vars = envalid.cleanEnv(process.env, {
  AUTH_DOMAIN: envalid.str({ devDefault: 'inteli.eu.auth0.com' }),
  AUTH_CLIENT_ID: envalid.str({
    devDefault: 'BvJaBbxOce4Pwi5PZpjBTStvNWwzugPd',
  }),
  AUTH_AUDIENCE: envalid.str({ devDefault: 'inteli-dev' }),
  API_HOST: envalid.host({ devDefault: 'localhost' }),
  API_PORT: envalid.port({ devDefault: 3001 }),
})

export default {
  ...vars,
}
