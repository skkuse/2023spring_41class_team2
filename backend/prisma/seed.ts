import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
async function main() {
  const salt = await bcrypt.genSalt();
  let hashedPassword = await bcrypt.hash('1234', salt);

  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      userid: 'alice1212',
      password: hashedPassword,
      email: 'alice@prisma.io',
      nickname: 'Alice',
    },
  });

  hashedPassword = await bcrypt.hash('abcd1234', salt);

  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      userid: 'bob1',
      password: hashedPassword,
      email: 'bob@prisma.io',
      nickname: 'Bob',
    },
  });
  console.log({ alice, bob });
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
