import fastify from 'fastify'
import { usersRoutes } from './routes/usersRoutes'
import { ZodError } from 'zod'

export const app = fastify()

app.register(usersRoutes)

app.setErrorHandler((error, _, reply) => {
	if (error instanceof ZodError) {
		reply.status(404).send({
			message: 'Validation Error',
			issues: error.format()
		})
	}

	reply.status(500).send()
})