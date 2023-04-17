import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { UserRepository } from '$lib/server/UserRepository';

export const load = (async ({ url }) => {
	const repo = new UserRepository();
	const user = await repo.findUnique(Number(url.searchParams.get('id')));
	if (user) {
		if (user.birthday) {
			const year = user.birthday.getFullYear();
			let month = `${user.birthday.getMonth() + 1}`;
			let day = `${user.birthday.getDate()}`;
			if (month.length < 2) month = '0' + month;
			if (day.length < 2) day = '0' + day;
			return {
				user: user,
				birthday: user.birthday != null ? [year, month, day].join('-') : ''
			};
		}
		return {
			user: user,
			birthday: ''
		};
	}
	throw error(404, 'Not found');
}) satisfies PageServerLoad;
// export const prerender = true;
