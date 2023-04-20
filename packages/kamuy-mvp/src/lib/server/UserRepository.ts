import { Prisma } from '@prisma/client'
import { db } from '$lib/server/prisma'

export class UserRepository {
	_user
	constructor() {
		this._user = db.user
	}
	async create(user: Prisma.UserCreateInput) {
		try {
			return await this._user.create({ data: user })
		} catch (e: unknown) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.error(e.code + ':' + e.message)
			}
			throw e
		}
	}
	async findMany() {
		return await this._user.findMany({ orderBy: [{ id: 'asc' }] })
	}
	async findUnique(id: number) {
		return await this._user.findUnique({ where: { id } })
	}
	async updateUnique(id: number, user: Prisma.UserUpdateInput) {
		try {
			return await this._user.update({ where: { id }, data: user })
		} catch (e: unknown) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.error(e.code + ':' + e.message)
			}
			throw e
		}
	}
	async deleteUnique(id: number) {
		try {
			return await this._user.delete({ where: { id } })
		} catch (e: unknown) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.error(e.code + ':' + e.message)
			}
			throw e
		}
	}
}
