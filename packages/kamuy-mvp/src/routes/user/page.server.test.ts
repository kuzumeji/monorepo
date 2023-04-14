import { beforeAll, describe, it, expect } from 'vitest';
import { Prisma, PrismaClient } from '@prisma/client';
import { load } from './+page.server';

const db = new PrismaClient();
const users: Prisma.Enumerable<Prisma.UserCreateManyInput> = [
	{ username: 'foo', name: 'foo', email: 'foo@gmail.com' },
	{ username: 'bar', name: 'bar', email: 'bar@gmail.com' },
	{ username: 'baz', name: 'baz', email: 'baz@gmail.com' }
];
beforeAll(async () => {
	await db.user.deleteMany();
	await db.user.createMany({ data: users });
});
describe('/userをテスト', () => {
	it('load()のテスト', async () => {
		const result = await load();
		expect(result.users).toHaveLength(3);
		expect(result.users[0].username).toBe('foo');
		expect(result.users[0].name).toBe('foo');
		expect(result.users[0].email).toBe('foo@gmail.com');
		expect(result.users[2].username).toBe('baz');
		expect(result.users[2].name).toBe('baz');
		expect(result.users[2].email).toBe('baz@gmail.com');
	});
});
