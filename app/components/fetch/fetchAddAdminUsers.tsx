import prisma from "@/prisma/client";
export default async function fetchAddAdminUsers(congregation: { id: string }) {
  console.log("wtf");
  const getAdminUsers = await prisma.user.findMany({
    where: {
      congregationID: congregation.id,
    },
  });
  console.log("inside fetch,", getAdminUsers);
  const data = await getAdminUsers.json();
  return data;
}
