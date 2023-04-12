import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import db from "$lib/server/db";

export const load = (async ({ url }) => {
  const user = await db.user.findUnique({
    where: { id: Number(url.searchParams.get("id")) },
  });
  if (user) {
    return user;
  }
  throw error(404, "Not found");
}) satisfies PageServerLoad;
// export const prerender = true;
