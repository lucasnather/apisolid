import { UserAlreadyExistsError } from '@/error/user-already-exists-error'
import makeRegisterUseCase from '@/use-cases/factories/make-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
	const userRegisterSchema = z.object({
		name: z.string(),
		email: z.string(),
		password_hash: z.string().min(6)
	})

	const { name, email, password_hash } = userRegisterSchema.parse(request.body)

	const registerUseCase = makeRegisterUseCase()

	try {
		const users = await registerUseCase.execute({ name, email, password_hash })

		reply.status(201).send(users)
	} catch (e) {
		if (e instanceof UserAlreadyExistsError) {
			reply.status(400).send({
				message: e.message
			})
		}
	}
}