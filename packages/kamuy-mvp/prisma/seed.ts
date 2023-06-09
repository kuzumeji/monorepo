import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';
const prisma = new PrismaClient();
async function main() {
	const URL = 'https://api.api-ninjas.com/v1/randomuser';
	const OPTIONS = {
		method: 'GET',
		headers: { 'x-api-key': `${process.env.NINJAS_API_KEY}` }
	};
	const USER_COUNT = 10;
	await prisma.user.deleteMany();
	for (let i = 0; i < USER_COUNT; i++) {
		fetch(URL, OPTIONS)
			.then((res) => res.json())
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.then(async (data: any) => {
				console.dir(data);
				await prisma.user.create({
					data: {
						username: data['username'],
						address: data['address'],
						name: data['name'],
						email: data['email'],
						birthday: new Date(data['birthday'])
					}
				});
			})
			.catch((err) => {
				console.log(`error ${err}`);
			});
	}
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
