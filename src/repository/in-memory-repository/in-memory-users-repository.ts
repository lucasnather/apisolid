import { IUser } from '@/interface/UserRepository'
import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'crypto'

export class InMemoryUsersRepository implements IUser {
	public itens: User[] = []

	async create(data: Prisma.UserCreateInput) {
		const user: User = {
			id: data.id ?? randomUUID(),
			name: data.name,
			email: data.email,
			password_hash: data.password_hash,
			created_at: new Date()
		}

		this.itens.push(user)

		return user
	}

	async findByEmail(email: string) {
		const user = this.itens.find(item => item.email === email)

		if (!user) return null

		return user
	}
}