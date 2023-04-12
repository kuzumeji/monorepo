import type { RequestHandler } from "./$types";
import prisma from "$lib/server/prisma";

export const GET: RequestHandler = async () => {
  const users = await prisma.user.findMany();
  console.log(users);
  return new Response(JSON.stringify(users));
};
