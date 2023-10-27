import { UsersRepository } from '@/repository/prisma/user-repository'
import { AuthenticateUseCase } from '../authenticateUseCase'

export default function makeAuthenticateUseCase() {
	const usersRepository = new UsersRepository()
	const authenticateUseCase = new AuthenticateUseCase(usersRepository)

	return authenticateUseCase
}