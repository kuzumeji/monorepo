import { beforeAll, afterAll, describe, it, expect } from 'vitest'
import { UserRepository } from './UserRepository'
import { db } from '$lib/server/prisma'
import type { Prisma, User } from '@prisma/client'

// const db = new PrismaClient();
const USERS: Prisma.Enumerable<Prisma.UserCreateManyInput> = [
	{ username: 'foo@UserRepository', name: 'foo', email: 'foo@gmail.com' },
	{ username: 'bar@UserRepository', name: 'bar', email: 'bar@gmail.com' },
	{ username: 'baz@UserRepository', name: 'baz', email: 'baz@gmail.com' }
]
beforeAll(() => {
	db.user.deleteMany({ where: { username: { endsWith: '@UserRepository' } } })
})
afterAll(() => {
	db.user.deleteMany({ where: { username: { endsWith: '@UserRepository' } } })
	// db.$disconnect()
})
const testee = new UserRepository()
describe('CRUD User', () => {
	const users: User[] = []
	it('Create User', () => {
		expect(() => {
			USERS.forEach((USER) => {
				testee.create(USER).then((data) => {
					users.push(data)
				})
			})
			// users.push(await testee.create(USERS[0]))
			// users.push(await testee.create(USERS[1]))
			// users.push(await testee.create(USERS[2]))
		}).not.toThrowError()
	})
	it('Read User', () => {
		testee.findMany().then((data) => {
			expect(data.length).greaterThanOrEqual(3)
		})
		testee.findUnique(users[0]?.id).then((data) => {
			expect(data?.name).toBe('foo')
		})
		testee.findUnique(users[1]?.id).then((data) => {
			expect(data?.name).toBe('bar')
		})
		testee.findUnique(users[2]?.id).then((data) => {
			expect(data?.name).toBe('baz')
		})
		// expect((await testee.findMany()).length).greaterThanOrEqual(3)
		// expect((await testee.findUnique(users[0].id))?.name).toBe('foo')
		// expect((await testee.findUnique(users[1].id))?.name).toBe('bar')
		// expect((await testee.findUnique(users[2].id))?.name).toBe('baz')
	})
	it('Update User', () => {
		const foo2: Prisma.UserUpdateInput = {
			email: 'foo2@gmail.com'
		}
		testee.updateUnique(users[0]?.id, foo2).then((data) => {
			expect(data?.email).toBe('foo2@gmail.com')
		})
		// expect((await testee.updateUnique(users[0].id, foo2))?.email).toBe('foo2@gmail.com')
	})
	it('Delete User', () => {
		testee.deleteUnique(users[0]?.id).then((data) => {
			expect(data?.name).toBe('foo')
		})
		testee.deleteUnique(users[1]?.id).then((data) => {
			expect(data?.name).toBe('bar')
		})
		testee.deleteUnique(users[2]?.id).then((data) => {
			expect(data?.name).toBe('baz')
		})
		// expect((await testee.deleteUnique(users[0].id))?.name).toBe('foo')
		// expect((await testee.deleteUnique(users[1].id))?.name).toBe('bar')
		// expect((await testee.deleteUnique(users[2].id))?.name).toBe('baz')
	})
})
