import * as yup from 'yup'

// Define how to validate
const configSchema = yup.object({
  POSTGRES_CONN_STRING: yup.string().required(),
})

const env = configSchema.cast(process.env, {
  assert: false,
  stripUnknown: true
})

configSchema.validateSync(env, { strict: true })

// Define what is available in our app
const config = {
  db: {
    url: env.POSTGRES_CONN_STRING
  }
}

export type Config = typeof config;

export default config

