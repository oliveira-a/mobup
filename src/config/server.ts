import * as yup from 'yup'

const configSchema = yup.object({
  DATABASE_URL: yup.string().required(),
})

const env = configSchema.cast(process.env, {
  assert: false,
  stripUnknown: true,
})

configSchema.validateSync(env, { strict: true })

const config = {
  db: {
    url: env.DATABASE_URL,
  },
}

export type Config = typeof config

export default config
