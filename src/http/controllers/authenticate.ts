import { InvalidCredentialsError } from '@/error/invalid-credentials-error'
import makeAuthenticateUseCase from '@/use-cases/factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {

	const getBodyAuthenticateSchema = z.object({
		email: z.string(),
		password_hash: z.string()
	})

	const { email, password_hash } = getBodyAuthenticateSchema.parse(request.body)

	const authenticateUseCase = makeAuthenticateUseCase()

	try {
		await authenticateUseCase.execute({ email, password_hash })

		reply.status(200).send({
			message: 'User permiss'
		})
	} catch (e) {
		if (e instanceof InvalidCredentialsError) {
			return reply.status(404).send({
				message: e.message
			})
		}
	}
}