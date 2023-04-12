import { error } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import db from "$lib/server/db";
import { Prisma } from "@prisma/client";

export const load = (async ({ url }) => {
  if (url.searchParams.get("id")) {
    const user = await db.user.findUnique({
      where: { id: Number(url.searchParams.get("id")) },
    });
    if (user) {
      return user;
    }
    throw error(404, "Not found");
  }
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    console.log("id:" + data.get("id"));
    console.log("email:" + data.get("email"));
    console.log("name:" + data.get("name"));
    try {
      if (data.get("id")) {
        return await db.user.update({
          where: {
            id: Number(data.get("id")),
          },
          data: {
            email: String(data.get("email")),
            name: String(data.get("name")),
          },
        });
      } else {
        return await db.user.create({
          data: {
            email: String(data.get("email")),
            name: String(data.get("name")),
          },
        });
      }
    } catch (e) {
      throw error(
        400,
        e instanceof Prisma.PrismaClientKnownRequestError
          ? e.code + " : " + e.message
          : "Bad Request"
      );
    }
  },
} satisfies Actions;

// export const prerender = true;
