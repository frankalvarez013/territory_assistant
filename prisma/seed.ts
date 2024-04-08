import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("test", 12);
  const congo = await prisma.congregation.upsert({
    where: { congregationName: "Maywood" },
    update: {}, // Update this if needed
    create: {
      congregationName: "Maywood",
      address: "Victoria st, 90201",
    },
  });
  const congo2 = await prisma.congregation.upsert({
    where: { congregationName: "Redwood" },
    update: {}, // Update this if needed
    create: {
      congregationName: "Redwood",
      address: "South Gate, 90201",
    },
  });
  const tester = await prisma.user.upsert({
    where: { email: "tester@prisma.io" },
    update: {
      name: "Franko Alvarez", // Update name on rerun
      // Add any other fields you want to update here
      isAdmin: true,
    },
    create: {
      email: "tester@prisma.io",
      name: "Frank Alvarez",
      password: password,
      congregation: {
        connect: {
          id: congo.id,
        },
      },
      isAdmin: true,
    },
  });
  const tester2 = await prisma.user.upsert({
    where: { email: "tester2@prisma.io" },
    update: {
      name: "Francisco Alvarez", // Update name on rerun
      // Add any other fields you want to update here
    },
    create: {
      email: "tester2@prisma.io",
      name: "Francisco Alvarez",
      password: password,
      congregation: {
        connect: {
          id: congo.id,
        },
      },
    },
  });
  const tester3 = await prisma.user.upsert({
    where: { email: "tester3@prisma.io" },
    update: {
      name: "Daniel Perez", // Update name on rerun
      // Add any other fields you want to update here
    },
    create: {
      email: "tester3@prisma.io",
      name: "Francisco Alvarez",
      password: password,
      congregation: {
        connect: {
          id: congo2.id,
        },
      },
    },
  });
  const tester4 = await prisma.user.upsert({
    where: { email: "tester4@prisma.io" },
    update: {
      name: "Bro Alvarez", // Update name on rerun
      // Add any other fields you want to update here
      isAdmin: true,
    },
    create: {
      email: "tester4@prisma.io",
      name: "Bro Alvarez",
      password: password,
      congregation: {
        connect: {
          id: congo.id,
        },
      },
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

function ExperiationDateCalculator(date: Date, daysToAdd: number): Date {
  var result = new Date(date);
  result.setDate(result.getDate() + daysToAdd);
  return result;
}
