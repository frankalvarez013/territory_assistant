import prisma from "@/prisma/client";
export async function GET(req, res) {
  const images = await prisma.image.findMany();
  res.json(images);
}
