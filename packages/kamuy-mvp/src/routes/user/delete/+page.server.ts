import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import db from '$lib/server/db';

export const load = (async ({ url }) => {
	if (url.searchParams.get('id')) {
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
		throw redirect(301, '/user');
	}
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		console.log('id:' + data.get('id'));
		if (data.get('id')) {
			return db.user.delete({
				where: {
					id: Number(data.get('id'))
				}
			});
		}
		throw error(404, 'Not found');
	}
} satisfies Actions;

// export const prerender = true;
