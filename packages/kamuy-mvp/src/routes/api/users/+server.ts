import type { RequestHandler } from './$types'
import { db } from '$lib/server/prisma'

export const GET: RequestHandler = async () => {
	const users = await db.user.findMany()
	console.log(users)
	return new Response(JSON.stringify(users))
}
