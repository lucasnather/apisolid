import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
	NODE_ENV: z.enum(['dev', 'test', 'production']),
	PORT: z.coerce.number().default(3333)
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
	console.error('Enviroment variable error', _env.error.format())

	throw new Error('Enviroment variable error')
}

export const env = _env.data

