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

  const tester = await prisma.user.upsert({
    where: { email: "tester@prisma.io" },
    update: {
      name: "Frank Alvarez", // Update name on rerun
      // Add any other fields you want to update here
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
    },
  });
  const date = new Date();
  const endDate = ExperiationDateCalculator(date, 30);
  const territory = await prisma.territory.upsert({
    where: {
      // Assuming territoryID and congregationID form a compound unique identifier
      territoryID_congregationID: {
        territoryID: 1, // The territory ID
        congregationID: congo.id, // The congregation ID
      },
    },
    update: {
      // Fields to update if the record exists
    },
    create: {
      territoryID: 1,
      location: "Fishburn 123",
      AssignedDate: date,
      ExperiationDate: endDate,
      congregationID: congo.id,
      currentUserID: tester.id,
    },
  });
  const territory2 = await prisma.territory.upsert({
    where: {
      // Assuming territoryID and congregationID form a compound unique identifier
      territoryID_congregationID: {
        territoryID: 2, // The territory ID
        congregationID: congo.id, // The congregation ID
      },
    },
    update: {
      // Fields to update if the record exists
    },
    create: {
      territoryID: 2,
      location: "Park Avenue 456",
      AssignedDate: date,
      ExperiationDate: endDate,
      congregationID: congo.id,
      currentUserID: tester.id,
    },
  });
  console.log({ tester });
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
