import type { PageServerLoad } from './$types';
import { UserRepository } from '$lib/server/UserRepository';

export const load = (async () => {
	const repo = new UserRepository();
	return {
		users: await repo.findMany()
	};
}) satisfies PageServerLoad;
// export const prerender = true;
