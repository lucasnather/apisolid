import { InMemoryUsersRepository } from '@/repository/in-memory-repository/in-memory-users-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { RegisterUseCase } from './registerUseCase'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from '@/error/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Test register use case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new RegisterUseCase(usersRepository)
	})

	it('should be register a user', async () => {
		const { user } = await sut.execute({
			name: 'lucas',
			email: 'lucas@gmail.com',
			password_hash: '123456'
		})

		console.log(user)

		expect(user.id).toEqual(expect.any(String))
	})

	it('should be able to error a register twice mail', async () => {
		await sut.execute({
			name: 'lucas',
			email: 'lucas@gmail.com',
			password_hash: '123456'
		})

		expect(async () => {
			await sut.execute({
				name: 'lucas',
				email: 'lucas@gmail.com',
				password_hash: '123456'
			})
		}).rejects.toBeInstanceOf(UserAlreadyExistsError)
	})

	it('should be able to hash password', async () => {
		const { user } = await sut.execute({
			name: 'lucas',
			email: 'lucas@gmail.com',
			password_hash: '123456'
		})

		const isPasswordHashed = await compare('123456', user.password_hash)


		expect(isPasswordHashed).toBeTruthy()
	})
})