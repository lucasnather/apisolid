import { prisma } from '@/database/prisma'
import { IUser } from '@/interface/UserRepository'

interface User {
	name: string,
	email: string,
	password_hash: string
}

export class UsersRepository implements IUser {
	async create({ name, email, password_hash }: User) {
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password_hash
			}
		})

		return user
	}

	async findByEmail(email: string) {
		const user = await prisma.user.findUnique({
			where: {
				email
			}
		})

		return user
	}

}