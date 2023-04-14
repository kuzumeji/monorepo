import type { PageServerLoad } from './$types';
import db from '$lib/server/db';

export const load = (async () => {
	return {
		users: await await db.user.findMany({ orderBy: [{ id: 'asc' }] })
	};
}) satisfies PageServerLoad;
// export const prerender = true;
