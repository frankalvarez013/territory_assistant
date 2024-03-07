import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next";
import { ZodIssue, z } from "zod";
import prisma from "@/prisma/client";
import type { House } from "@prisma/client";
import { ErrorResponse } from "@/app/types/api";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
const createHouseSchema = z.object({
  territoryID: z.number(),
  StreetAd: z.string().min(1).max(255),
  dateVisited: z.date().optional(),
  comment: z.string().min(1).max(255).optional(),
  observation: z
    .enum([
      "EMPTY",
      "NO_LLEGAR",
      "INGLES",
      "OTRO_IDIOMA",
      "DUERME_DE_DIA",
      "VARON_VISITA",
      "PERRO_AFUERA",
      "PERRO_EN_CASA",
      "TESTIGOS",
      "VIOLENTO",
      "NO_TRASPASAR",
      "CANDADO",
    ])
    .optional(),
});
const updateHouseSchema = z.object({
  territoryID: z.number().positive().finite().optional(),
  StreetAd: z.string().min(1).max(255).optional(),
  dateVisited: z.date().optional(),
  comment: z.string().min(1).max(255).optional(),
  observation: z
    .enum(["EMPTY", "VISITED", "DONTVISIT", "DOG", "NIGHT"])
    .optional(),
  //use zod to check if the isAdmin is true or false "strings"
});
export async function POST(
  request: NextRequest
): Promise<NextResponse<House | ErrorResponse | ZodIssue[]>> {
  const body = await request.json();
  const validation = createHouseSchema.safeParse(body);
  const session = await getServerSession(authOptions);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  try {
    const newHouse = await prisma.house.create({
      data: {
        houseID: 1,
        territoryID: body.territoryID,
        Direction: body.direction,
        congregationID: session?.user.congID,
        StreetAd: body.StreetAd,
        dateVisited: body.dateVisited,
        comment: body.comment,
        observation: body.observation,
      },
    });
    return NextResponse.json(newHouse, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { message: `House POST Transaction failed:\n ${e}` },
      { status: 201 }
    );
  }
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<House | House[] | ErrorResponse>> {
  const idParam = request.nextUrl.searchParams.get("TerritoryID");
  const streetdAdParam = request.nextUrl.searchParams.get("StreetAd");
  const streetAd = streetdAdParam ? streetdAdParam : undefined;
  const territoryID = idParam ? parseInt(idParam) : undefined;
  let getHouse: House | House[] | null = null;
  if (territoryID) {
    getHouse = await prisma.house.findUnique({
      where: {
        territoryID: territoryID ?? undefined,
        StreetAd: streetAd ?? undefined,
      },
    });
  } else {
    getHouse = await prisma.house.findMany({
      where: {
        territoryID: territoryID ?? undefined,
      },
    });
  }
  if (!getHouse) {
    return NextResponse.json(
      { message: "House record not found" },
      { status: 404 }
    );
  }
  return NextResponse.json(getHouse, { status: 201 });
}

export async function PATCH(
  request: NextRequest
): Promise<NextResponse<House | ErrorResponse | ZodIssue[]>> {
  const idParam = request.nextUrl.searchParams.get("TerritoryID");
  const streetdAdParam = request.nextUrl.searchParams.get("StreetAd");
  const streetAd = streetdAdParam ? streetdAdParam : undefined;
  const territoryID = idParam ? parseInt(idParam) : undefined;
  const body = await request.json();
  const validation = updateHouseSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  const updateData: { [key: string]: any } = {};
  for (const [key, value] of Object.entries(body)) {
    if (value !== undefined) {
      updateData[key] = value;
    }
  }
  try {
    const updatedHouse = await prisma.house.update({
      where: {
        territoryID: territoryID ?? undefined,
        StreetAd: streetAd ?? undefined,
      },
      data: updateData,
    });
    return NextResponse.json(updatedHouse, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { message: `House Update Transaction failed:\n ${e}` },
      { status: 201 }
    );
  }
}

export async function DELETE(
  request: NextRequest
): Promise<NextResponse<House | ErrorResponse>> {
  const idParam = request.nextUrl.searchParams.get("terrId");
  const streetdAdParam = request.nextUrl.searchParams.get("streetAd");
  const streetAd = streetdAdParam ? streetdAdParam : undefined;
  const territoryID = idParam ? parseInt(idParam) : undefined;
  try {
    const deletedHouse = await prisma.house.delete({
      where: {
        territoryID: territoryID ?? undefined,
        StreetAd: streetAd ?? undefined,
      },
    });
    return NextResponse.json(deletedHouse, { status: 201 });
  } catch (e) {
    return NextResponse.json({
      message: `House DELETE Transaction failed:\n ${e}`,
    });
  }
}
