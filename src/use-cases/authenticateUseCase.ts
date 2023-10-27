import { InvalidCredentialsError } from '@/error/invalid-credentials-error'
import { IUser } from '@/interface/UserRepository'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {
	email: string
	password_hash: string
}

interface AuthenticateUseCaseResponse {
	id: string
	name: string
	email: string
	password_hash: string
	created_at: Date
}

export class AuthenticateUseCase {

	constructor(private usersRepository: IUser) { }

	async execute({ email, password_hash }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
		const userExists = await this.usersRepository.findByEmail(email)
		console.log('usuario aquii ', userExists)

		if (userExists == null) throw new InvalidCredentialsError()

		const doesPasswordExists = await compare(password_hash, userExists.password_hash)

		if (!doesPasswordExists) throw new InvalidCredentialsError()

		return userExists
	}
}