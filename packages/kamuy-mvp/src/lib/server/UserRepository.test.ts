import { beforeAll, afterAll, describe, it, expect } from 'vitest'
import { UserRepository } from './UserRepository'
import { db } from '$lib/server/prisma'
import { Prisma } from '@prisma/client'
import type { User } from '@prisma/client'

const USERS: Prisma.Enumerable<Prisma.UserCreateManyInput> = [
	{ username: 'foo@UserRepository', name: 'foo', email: 'foo@gmail.com' },
	{ username: 'bar@UserRepository', name: 'bar', email: 'bar@gmail.com' },
	{ username: 'baz@UserRepository', name: 'baz', email: 'baz@gmail.com' }
]
const USERNAMES: string[] = ['foo', 'bar', 'baz']
beforeAll(async () => {
	await db.user.deleteMany({ where: { username: { endsWith: '@UserRepository' } } })
})
afterAll(async () => {
	await db.user.deleteMany({ where: { username: { endsWith: '@UserRepository' } } })
	// await db.$disconnect()
})
const testee = new UserRepository()
describe('CRUD User', () => {
	const users: User[] = []
	it('Create User', async () => {
		for (const USER of USERS) {
			const user = await testee.create(USER)
			console.log(user)
			users.push(user)
		}
		try {
			const user = await testee.create(USERS[0])
			expect(user).not.toBe(null)
		} catch (e) {
			expect(e).toBeInstanceOf(Prisma.PrismaClientKnownRequestError)
		}
	})
	it('Read User', async () => {
		testee.findMany().then((data) => {
			expect(data.length).greaterThanOrEqual(3)
		})
		for (let i = 0; i < 3; i++) {
			testee.findUnique(users[i]?.id).then((data) => {
				expect(data?.name).toBe(USERNAMES[i])
			})
		}
		const user = await testee.findUnique(0)
		expect(user).toBe(null)
	})
	it('Update User', async () => {
		const foo2: Prisma.UserUpdateInput = {
			email: 'foo2@gmail.com'
		}
		testee.updateUnique(users[0]?.id, foo2).then((data) => {
			expect(data?.email).toBe('foo2@gmail.com')
		})
		try {
			await testee.updateUnique(0, foo2)
		} catch (e) {
			expect(e).toBeInstanceOf(Prisma.PrismaClientKnownRequestError)
		}
	})
	it('Delete User', async () => {
		for (let i = 0; i < 3; i++) {
			testee.deleteUnique(users[i]?.id).then((data) => {
				expect(data?.name).toBe(USERNAMES[i])
			})
		}
		try {
			await testee.deleteUnique(0)
		} catch (e) {
			expect(e).toBeInstanceOf(Prisma.PrismaClientKnownRequestError)
		}
	})
})
