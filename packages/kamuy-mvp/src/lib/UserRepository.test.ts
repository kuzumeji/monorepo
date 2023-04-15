import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import { Prisma, PrismaClient, type User } from '@prisma/client';
import { UserRepository } from './UserRepository';

const DB = new PrismaClient();
const USERS: Prisma.Enumerable<Prisma.UserCreateManyInput> = [
	{ username: 'foo@UserRepository', name: 'foo', email: 'foo@gmail.com' },
	{ username: 'bar@UserRepository', name: 'bar', email: 'bar@gmail.com' },
	{ username: 'baz@UserRepository', name: 'baz', email: 'baz@gmail.com' }
];
beforeAll(async () => {
	await DB.user.deleteMany({ where: { username: { endsWith: '@UserRepository' } } });
});
afterAll(async () => {
	await DB.user.deleteMany({ where: { username: { endsWith: '@UserRepository' } } });
	await DB.$disconnect();
});
const testee = new UserRepository(DB);
describe('CRUD User', async () => {
	const users: User[] = [];
	it('Create User', async () => {
		expect(async () => {
			users.push(await testee.create(USERS[0]));
			users.push(await testee.create(USERS[1]));
			users.push(await testee.create(USERS[2]));
		}).not.toThrowError();
	});
	it('Read User', async () => {
		expect((await testee.findMany()).length).greaterThanOrEqual(3);
		expect((await testee.findUnique(users[0].id))?.name).toBe('foo');
		expect((await testee.findUnique(users[1].id))?.name).toBe('bar');
		expect((await testee.findUnique(users[2].id))?.name).toBe('baz');
	});
	it('Update User', async () => {
		const foo2: Prisma.UserUpdateInput = {
			email: 'foo2@gmail.com'
		}
		expect((await testee.updateUnique(users[0].id, foo2))?.email).toBe('foo2@gmail.com');
	});
	it('Delete User', async () => {
		expect((await testee.deleteUnique(users[0].id))?.name).toBe('foo');
		expect((await testee.deleteUnique(users[1].id))?.name).toBe('bar');
		expect((await testee.deleteUnique(users[2].id))?.name).toBe('baz');
	});
});
