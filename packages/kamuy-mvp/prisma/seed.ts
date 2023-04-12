import { PrismaClient } from "@prisma/client";
import randomWords from "random-words";
const prisma = new PrismaClient();
async function main() {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  const names = randomWords(10);
  names.forEach(async (name) => {
    const email = name + "@gamail.com";
    await prisma.user.create({
      data: {
        email: email,
        name: name,
      },
    });
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });