import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import db from '$lib/server/db';

export const load = (async ({ url }) => {
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
}) satisfies PageServerLoad;
// export const prerender = true;
