import { error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import db from '$lib/server/db';
import { Prisma } from '@prisma/client';

export const load = (async ({ url }) => {
	if (url.searchParams.get('id') == null) {
		return {
			user: { id: null, username: null, address: null, name: null, email: null },
			birthday: null
		};
	} else {
		const user = await db.user.findUnique({
			where: { id: Number(url.searchParams.get('id')) }
		});
		if (user) {
			const year = user.birthday.getFullYear();
			let month = `${user.birthday.getMonth() + 1}`;
			let day = `${user.birthday.getDate()}`;
			if (month.length < 2) month = '0' + month;
			if (day.length < 2) day = '0' + day;
			return {
				user: user,
				birthday: [year, month, day].join('-')
			};
		}
		throw error(404, 'Not found');
	}
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		console.dir(data);
		try {
			if (!data.get('id')) {
				return await db.user.create({
					data: {
						username: String(data.get('username')),
						address: String(data.get('address')),
						name: String(data.get('name')),
						email: String(data.get('email')),
						birthday: new Date(String(data.get('birthday')))
					}
				});
			} else {
				return await db.user.update({
					where: {
						id: Number(data.get('id'))
					},
					data: {
						address: String(data.get('address')),
						name: String(data.get('name')),
						email: String(data.get('email')),
						birthday: new Date(String(data.get('birthday')))
					}
				});
			}
		} catch (e) {
			throw error(
				400,
				e instanceof Prisma.PrismaClientKnownRequestError
					? e.code + ' : ' + e.message
					: 'Bad Request'
			);
		}
	}
} satisfies Actions;

// export const prerender = true;
