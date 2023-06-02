import { PrismaClient, Status } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
async function main() {
  const salt = await bcrypt.genSalt();
  let hashedPassword = await bcrypt.hash('1234', salt);
  const utf8Encode = new TextEncoder();

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
      content: Buffer.from(
        'You are a developer in charge of token development.\n\
Depending on the business logic required, presales must sell 1000 tokens, which is 10% of total token sales.\n\
However, there is a serious bug in the contract code you developed.\n\
Describe the SWC ID representing the bug in the form of SWC-xxx.',
        'utf-8',
      ),
      answer: 'SWC-119',
      code: Buffer.from(
        '\
pragma solidity 0.4.24;\n\
contract Tokensale {\n\
    uint hardcap = 10000 ether;\n\
\n\
    function Tokensale() {}\n\
\n\
    function fetchCap() public constant returns(uint) {\n\
        return hardcap;\n\
    }\n\
}\n\
contract Presale is Tokensale {\n\
    uint hardcap = 1000 ether;\n\
    function Presale() Tokensale() {}\n\
}',
        'utf-8',
      ),
    },
  });

  const problem2 = await prisma.problem.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'SQL injection',
      content: Buffer.from(
        'Your task is to set userid varaible to specific value to delete all data in database.\n\
You can use sqlite3 module to access database.\n\
Submit the value of userid variable.',
        'utf-8',
      ),
      answer: '"; DROP TABLE my_table; --',
      code: Buffer.from(
        '\
import sqlite3 \n\
\n\
userid = input()\n\
\n\
conn = sqlite3.connect("test.db")\n\
cur = conn.cursor()\n\
\n\
cur.execute("SELECT * FROM my_table WHERE id =" + userid)\n\
cur.close()\n\
conn.close()',
        'utf-8',
      ),
    },
  });

  // *********************SJH

  const problem3 = await prisma.problem.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: 'Null pointer dereference',
      content: Buffer.from(
        'Your task is to find out what kind of error(fault) can occur in a code below.\n\
It dereference a null pointer.\n\
Submit a error type. (Two Words)',
        'utf-8',
      ),
      answer: 'Segmentation fault',
      code: Buffer.from(
        '\
#define NULL 0 \n\
int main(){\n\
  int *p=NULL;\n\
  if (*p){}\n\
  return 0;\n\
}',
        'utf-8',
      ),
    },
  });

  const problem4 = await prisma.problem.upsert({
    where: { id: 4 },
    update: {},
    create: {
      title: 'Use of uninitialized variable',
      content: Buffer.from(
        'Your task is to find out how using a unintialized variable can affect the computer security.\n\
It can bypass certain security technique involved in preventing exploitation of memory corruption vulnerabilities.\n\
Submit the secutiry technique in four capital letters.',
        'utf-8',
      ),
      answer: 'ASLR',
      code: Buffer.from(
        '\
int main(){\n\
  int x,y;\n\
  x=y+1;\n\
  return 0;\n\
}',
        'utf-8',
      ),
    },
  });

  // *********************HHG

  const problem5 = await prisma.problem.upsert({
    where: { id: 5 },
    update: {},
    create: {
      title: 'Improper initialization',
      content: Buffer.from(
        'What would be the result of executing the above code?\n\
Write the correct alphabet in the following brackets. (Write an answer in capital letters.)\n\
The answer is ( ).\n\
\n\
A) A compilation error occurs\n\
B) Runtime error occurs\n\
C) "Hello world" is printed out\n\
D) Different results are printed',
        'utf-8',
      ),
      answer: 'B',
      code: Buffer.from(
        '\
#include <stdio.h> \n\
#include <string.h> \n\
int main(){\n\
  char str[20];\n\
  strcat(str, "hello world");\n\
  printf("%s", str);\n\
  return 0;\n\
}',
        'utf-8',
      ),
    },
  });

  const problem6 = await prisma.problem.upsert({
    where: { id: 6 },
    update: {},
    create: {
      title: 'Double free',
      content: Buffer.from(
        'Choose the correct description of the behavior of the code above.\n\
Write the correct alphabet in the following brackets. (To write an answer in capital letters.)\n\
The answer is ( ).\n\
\n\
A) Memory allocation and release are performed correctly.\n\
B) A runtime error occurs.\n\
C) The second free function call is ignored.\n\
D) Memory allocation is not possible again after the first free function call.',
        'utf-8',
      ),
      answer: 'B',
      code: Buffer.from(
        '\
#include <stdlib.h>\n\
#define SIZE 16\n\
int main(){\n\
  char* ptr = (char*)malloc (SIZE);\n\
  if (1) {\n\
    free(ptr);\n\
  }\n\
  free(ptr);\n\
  return 0;\n\
}',
        'utf-8',
      ),
    },
  });

  // *********************KTY

  const problem7 = await prisma.problem.upsert({
    where: { id: 7 },
    update: {},
    create: {
      title: 'Use of externally-controlled format string',
      content: Buffer.from(
        'Which is not a way to minimize vulnerabilities to possible problems in the following code?\n\
1. Validation of external input: validation of argv[1] should be performed to ensure that it is an appropriate type string.\n\
   If necessary, you should create a function that validates the type string or filter specific type specifiers to allow only secure type strings.\n\
\n\
2. Buffer overflow protection: When copying external inputs to buf using the memcpy() function,\n\
   you must dynamically assign the size of the buffer to match the length of the external input,\n\
   or limit the length of the input to prevent buffer overflow. This means that you must make the maximum size to copy when you call memcpy().\n\
\n\
3. Replace the type string function: When processing an externally entered type string, you must use an alternative function that handles the type string securely instead of the printf() function.\n\
   For example, in C++, you can use formalized output functions such as std::cout',
        'utf-8',
      ),
      answer: '2',
      code: Buffer.from(
        '\
#include <stdio.h>\n\
#include <string.h>\n\
\n\
void printWrapper(char *string) {\n\
  printf(string);\n\
}\n\
\n\
int main(int argc, char **argv) {\n\
  char buf[5012];\n\
  memcpy(buf, argv[1], 5012);\n\
  printWrapper(argv[1]);\n\
  return 0;\n\
}',
        'utf-8',
      ),
    },
  });

  const problem8 = await prisma.problem.upsert({
    where: { id: 8 },
    update: {},
    create: {
      title: 'Numeric truncation error',
      content: Buffer.from(
        'What are the intPrimitive and shortPrimitive values when executing the following code?\n\
Write in (intPrimitive,shortPrimitive) format',
        'utf-8',
      ),
      answer: '(2147483647,-1)',
      code: Buffer.from(
        '\
#include <stdio.h>\n\
\n\
int main(){\n\
  int intPrimitive;\n\
  short shortPrimitive;\n\
\n\
  intPrimitive = (int)(~((int)0) ^ (1 << (sizeof(int)*8-1)));\n\
  shortPrimitive = intPrimitive;\n\
\n\
  printf("Int MAXINT: %d Short MAXINT: %d", intPrimitive, shortPrimitive);\n\
  return 0;\n\
}',
        'utf-8',
      ),
    },
  });

  // *********************KHY

  const problem9 = await prisma.problem.upsert({
    where: { id: 9 },
    update: {},
    create: {
      title: 'Integer Overflow or Wraparound',
      content: Buffer.from(
        'Write the number of the correct pairs\n\
What is the error of this code?\n\
The malicious code is in Line (A), the reason is (B).\n\
(1) (A) - 13 (B) - Integer Overflow or Wraparound\n\
(2) (A) - 12 (B) - Improper initialization\n\
(3) (A) - 08 (B) - Buffer copy without checking size of input\n\
(4) (A) - 13 (B) - Null pointer dereference',
        'utf-8',
      ),
      answer: '1',
      code: Buffer.from(
        '\
int main(){\n\
  char *buf;\n\
  int len;\n\
  /* for some file descriptor fd*/\n\
  read(0, &len, sizeof(len));\n\
\n\
  if (len > 8000) {return 0;}\n\
  buf = malloc(len);\n\
  read(0, buf, len);\n\
  return 0;\n\
}',
        'utf-8',
      ),
    },
  });

  const problem10 = await prisma.problem.upsert({
    where: { id: 10 },
    update: {},
    create: {
      title: 'Use after free',
      content: Buffer.from(
        'Write the number of the correct pairs\n\
What is the error of this code?\n\
The malicious code is in Line (A), the reason is (B).\n\
(1) (A) - 10 (B) - Double free\n\
(2) (A) - 15 (B) - Use after free detected\n\
(3) (A) - 17 (B) - Missing release of memory after effective lifetime\n\
(4) (A) - 23 (B) - Improper initialization',
        'utf-8',
      ),
      answer: '2',
      code: Buffer.from(
        '\
#include <stdio.h>\n\
#include <stdlib.h>\n\
\n\
void dangerous_func ( int* ptr , int a, int b) {\n\
  int val = 0;\n\
  if (! ptr) return;\n\
  if(a) {\n\
    *ptr+= 2;\n\
  } \n\
  else {\n\
    val=*ptr ; \n\
    free(ptr) ;\n\
  }\n\
  if(b) {\n\
    val += 5;\n\
  }\n\
  else {\n\
    val += *ptr ; \n\
  }\n\
  if(a) free(ptr) ;\n\
  printf ("val = %i", val) ;\n\
}\n\
\n\
int main () {\n\
  /* Unsafe function call */\n\
  dangerous_func(malloc(sizeof ( int)),0,0) ;\n\
  return 0;\n\
}',
        'utf-8',
      ),
    },
  });

  // Buffer.from(, "utf-8")

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

  // 2~5 SJH
  const question2 = await prisma.suggestedQuestion.upsert({
    where: {
      id: 2,
    },
    update: {},
    create: {
      problemid: 3,
      content: 'Explain a runtime error.',
    },
  });

  const question3 = await prisma.suggestedQuestion.upsert({
    where: {
      id: 3,
    },
    update: {},
    create: {
      problemid: 3,
      content: 'Explain problems of dereferencing null pointer.',
    },
  });

  const question4 = await prisma.suggestedQuestion.upsert({
    where: {
      id: 4,
    },
    update: {},
    create: {
      problemid: 4,
      content: 'Explain computer security techniques related to memory.',
    },
  });

  const question5 = await prisma.suggestedQuestion.upsert({
    where: {
      id: 5,
    },
    update: {},
    create: {
      problemid: 4,
      content:
        'Explain how using uninitialized variable can cause on computer security.',
    },
  });

  // 6~11 HHG
  const question6 = await prisma.suggestedQuestion.upsert({
    where: {
      id: 6,
    },
    update: {},
    create: {
      problemid: 5,
      content:
        "What's the difference between compilation error and runtime error?",
    },
  });

  const question7 = await prisma.suggestedQuestion.upsert({
    where: {
      id: 7,
    },
    update: {},
    create: {
      problemid: 5,
      content: 'What are the types of runtime errors?',
    },
  });

  const question8 = await prisma.suggestedQuestion.upsert({
    where: {
      id: 8,
    },
    update: {},
    create: {
      problemid: 5,
      content: 'How does the strcat function work in C language?',
    },
  });

  const question9 = await prisma.suggestedQuestion.upsert({
    where: {
      id: 9,
    },
    update: {},
    create: {
      problemid: 6,
      content: 'What are the types of runtime errors?',
    },
  });

  const question10 = await prisma.suggestedQuestion.upsert({
    where: {
      id: 10,
    },
    update: {},
    create: {
      problemid: 6,
      content:
        'What would be the result of not calling the free function after allocating memory using the malloc function?',
    },
  });
  const question11 = await prisma.suggestedQuestion.upsert({
    where: {
      id: 11,
    },
    update: {},
    create: {
      problemid: 6,
      content: 'How does the malloc function work in C language?',
    },
  });

  // 12~15 KTY
  const question12 = await prisma.suggestedQuestion.upsert({
    where: {
      id: 12,
    },
    update: {},
    create: {
      problemid: 7,
      content: 'What is externally-controlled format string vulnerability?',
    },
  });

  const question13 = await prisma.suggestedQuestion.upsert({
    where: {
      id: 13,
    },
    update: {},
    create: {
      problemid: 7,
      content: 'What is Buffer Overflow?',
    },
  });

  const question14 = await prisma.suggestedQuestion.upsert({
    where: {
      id: 14,
    },
    update: {},
    create: {
      problemid: 8,
      content: 'What is Numeric truncation error?',
    },
  });

  const question15 = await prisma.suggestedQuestion.upsert({
    where: {
      id: 15,
    },
    update: {},
    create: {
      problemid: 8,
      content: 'What is the range of data types (int, short)?',
    },
  });

  // 16~20 KHY
  const question16 = await prisma.suggestedQuestion.upsert({
    where: {
      id: 16,
    },
    update: {},
    create: {
      problemid: 9,
      content: 'What happen if we cast negative signed to unsigned int?',
    },
  });

  const question17 = await prisma.suggestedQuestion.upsert({
    where: {
      id: 17,
    },
    update: {},
    create: {
      problemid: 9,
      content: 'What happen if we set the size of malloc to negative values?',
    },
  });

  const question18 = await prisma.suggestedQuestion.upsert({
    where: {
      id: 18,
    },
    update: {},
    create: {
      problemid: 10,
      content: 'Why do we have to free malloc?',
    },
  });

  const question19 = await prisma.suggestedQuestion.upsert({
    where: {
      id: 19,
    },
    update: {},
    create: {
      problemid: 10,
      content: 'What happen if we use malloc after freeing it?',
    },
  });

  const question20 = await prisma.suggestedQuestion.upsert({
    where: {
      id: 20,
    },
    update: {},
    create: {
      problemid: 10,
      content: 'Why we do not have to double free malloc?',
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

  const solved3 = await prisma.solved.upsert({
    where: {
      userid_problemid: {
        userid: 'bob1',
        problemid: 3,
      },
    },
    update: {},
    create: {
      userid: 'bob1',
      problemid: 3,
      status: Status.Solved,
    },
  });

  const solved4 = await prisma.solved.upsert({
    where: {
      userid_problemid: {
        userid: 'alice1212',
        problemid: 2,
      },
    },
    update: {},
    create: {
      userid: 'alice1212',
      problemid: 2,
      status: Status.Solved,
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
