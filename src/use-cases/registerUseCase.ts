import { UserAlreadyExistsError } from '@/error/user-already-exists-error'
import { IUser } from '@/interface/UserRepository'
import { hash } from 'bcryptjs'

interface User {
	name: string,
	email: string,
	password_hash: string
}

export class RegisterUseCase {

	constructor(private usersRepository: IUser) { }

	async execute({ name, email, password_hash }: User) {
		const findUser = await this.usersRepository.findByEmail(email)

		if (findUser !== null) throw new UserAlreadyExistsError()

		const password = await hash(password_hash, 6)

		const user = await this.usersRepository.create({
			name,
			email,
			password_hash: password
		})

		return {
			user
		}
	}
}