import { PrismaClient, Status } from '@prisma/client';
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

  const camel = await prisma.user.upsert({
    where: { email: 'camel@gamil.com' },
    update: {},
    create: {
      userid: 'desertcamel',
      password: hashedPassword,
      email: 'camel@gamil.com',
      nickname: 'Camel',
    },
  });

  const dante = await prisma.user.upsert({
    where: { email: 'dante@gamil.com' },
    update: {},
    create: {
      userid: 'divdiv',
      password: hashedPassword,
      email: 'dante@gamil.com',
      nickname: 'Dante',
    },
  });

  const emily = await prisma.user.upsert({
    where: { email: 'emily@gamil.com' },
    update: {},
    create: {
      userid: 'emilia',
      password: hashedPassword,
      email: 'emily@gamil.com',
      nickname: 'Emily',
    },
  });

  const problem1 = await prisma.problem.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Unexpected smart contract',
      content: `You are a developer in charge of token development.

      Depending on the business logic required, presales must sell 1000 tokens, which is 10% of total token sales.
      
      However, there is a serious bug in the contract code you developed.
      
      Describe the SWC ID representing the bug in the form of SWC-xxx.`,
      answer: 'SWC-119',
      code: `pragma solidity 0.4.24;

      contract Tokensale {
          uint hardcap = 10000 ether;
      
          function Tokensale() {}
      
          function fetchCap() public constant returns(uint) {
              return hardcap;
          }
      }
      
      contract Presale is Tokensale {
          uint hardcap = 1000 ether;
      
          function Presale() Tokensale() {}
      }`,
    },
  });

  const problem2 = await prisma.problem.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'SQL injection',
      content: `Your task is to set userid varaible to specific value to delete all data in database.
      You can use sqlite3 module to access database.
      Submit the value of userid variable.`,
      answer: `"; DROP TABLE my_table; --`,
      code: `import sqlite3

      userid = input()
      
      conn = sqlite3.connect("test.db")
      cur = conn.cursor()
      
      cur.execute("SELECT * FROM my_table WHERE id =" + userid)
      cur.close()
      conn.close()
      `,
    },
  });

  const solved1 = await prisma.solved.upsert({
    where: {
      userid_problemid: {
        userid: 'alice1212',
        problemid: 1,
      },
    },
    update: {},
    create: {
      userid: 'alice1212',
      problemid: 1,
      status: Status.Solved,
    },
  });

  const solved2 = await prisma.solved.upsert({
    where: {
      userid_problemid: {
        userid: 'emilia',
        problemid: 1,
      },
    },
    update: {},
    create: {
      userid: 'emilia',
      problemid: 1,
      status: Status.Solved,
    },
  });

  const question1 = await prisma.suggestedQuestion.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      problemid: 1,
      content: 'Explain shadowing state variables in Solidity.',
    },
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
