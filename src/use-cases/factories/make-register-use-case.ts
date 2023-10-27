import { UsersRepository } from '@/repository/prisma/user-repository'
import { RegisterUseCase } from '../registerUseCase'

export default function makeRegisterUseCase() {
	const usersRepository = new UsersRepository()
	const registerUseCase = new RegisterUseCase(usersRepository)

	return registerUseCase
}