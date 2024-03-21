import convict from 'convict'
import convictValidator from 'convict-format-with-validator'
import { config as dotEnvConfig } from 'dotenv'
import { join } from 'path'

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'local'

const dotenvPath = join(__dirname, `../.env.${env}`)

dotEnvConfig({ path: dotenvPath })

convict.addFormats(convictValidator)

const conf = convict({
  version: {
    env: 'VERSION',
    format: String,
    default: '1'
  },
  server: {
    host: {
      env: 'HOST',
      format: String,
      default: '0.0.0.0'
    },
    port: {
      env: 'PORT',
      format: Number,
      default: 3002
    }
  },
  database: {
    url: {
      env: 'DATABASE_URL_WITH_SCHEMA',
      format: String,
      default: ''
    }
  }
}).validate({
  // We do not have access to a logger yet
  // eslint-disable-next-line no-console
  output: console.error,
  allowed: 'strict'
})

export const config = conf.get()

export type Config = typeof config
