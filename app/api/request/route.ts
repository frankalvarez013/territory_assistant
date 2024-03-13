import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
import { Territory } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Observation } from "@prisma/client";
const createRequestSchema = z.object({
  territoryID: z.number().positive().finite(),
  houseID: z.number().positive().finite(),
  congregationID: z.string().min(1).max(255),
  observation: z.nativeEnum(Observation).optional(),
  comment: z.string().min(1).max(255).optional(),
  //use zode to check if the isAdmin is true or false "strings"
});
const updateRequestSchema = z.object({
  territoryID: z.number().positive().finite(),
  houseID: z.number().positive().finite(),
  congregationID: z.string().min(1).max(255),
  observation: z.nativeEnum(Observation).optional(),
  comment: z.string().min(1).max(255).optional(),
  approval: z.boolean(),
});
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createRequestSchema.safeParse(body);

  if (!validation.success) {
    console.log("BRUh");
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  console.log("Went thru2");
  try {
    const newRequest = await prisma.request.create({
      data: {
        territoryID: validation.data.territoryID,
        houseID: validation.data.houseID,
        congregationID: validation.data.congregationID.toString(),
        observation: validation.data.observation,
        comment: validation.data.comment,
      },
    });
    return NextResponse.json(newRequest, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: `Request POST failed:\n ${e}` });
  }
}

export async function GET(request: NextRequest, response: NextResponse) {
  const idParams = request.nextUrl.searchParams.get("territoryID");
  const congId = request.nextUrl.searchParams.get("congName");
  const session = await getServerSession(authOptions);
  // console.log("inside", session);
  let getTerritory: Territory | Territory[] | null = null;
  try {
    if (idParams && congId) {
      const getCong = await prisma.congregation.findUnique({
        where: {
          congregationName: congId,
        },
      });
      if (getCong) {
        getTerritory = await prisma.territory.findUnique({
          where: {
            territoryID_congregationID: {
              territoryID: parseInt(idParams) ?? undefined,
              congregationID: getCong.id,
            },
          },
          include: {
            Request: true,
          },
        });
      }
    }
    if (!getTerritory) {
      return NextResponse.json({ message: "User Record not found" });
    }
    console.log("Inside Request: ", getTerritory);

    return NextResponse.json(getTerritory, { status: 201 });
  } catch (e) {
    return NextResponse.json({
      message: `USER GET transaction failed:\n ${e}`,
    });
  }
}
export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const validation = updateRequestSchema.safeParse(body);
  let updatedHouse = {};
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  const updateData: { [key: string]: any } = {};
  for (const [key, value] of Object.entries(validation.data)) {
    if (value !== undefined) {
      if ((key === "approval" && value === true) || key) {
        try {
          updatedHouse = await prisma.house.update({
            where: {
              territoryID_houseID_congregationID: {
                territoryID: validation.data.territoryID,
                congregationID: validation.data.congregationID.toString(),
                houseID: validation.data.houseID,
              },
            },
            data: {
              observation: validation.data.observation,
              comment: validation.data.comment,
            },
          });
        } catch {
          console.log("OI");
        }
      }
      updateData[key] = value;
    }
  }
  try {
    const updatedTerritory = await prisma.territory.update({
      where: {
        territoryID_congregationID: {
          territoryID: validation.data.territoryID,
          congregationID: validation.data.congregationID.toString(),
        },
      },
      data: updateData,
    });
    return NextResponse.json(
      { updatedTerritory, updatedHouse },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json({
      message: `User UPDATE Transaction Failed\n: ${e}`,
    });
  }
}

export async function DELETE(request: NextRequest) {
  const idParam = request.nextUrl.searchParams.get("id");
  const id = idParam ? parseInt(idParam, 10) : undefined;
  try {
    const deletedUser = await prisma.request.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(deletedUser, { status: 201 });
  } catch (e) {
    return NextResponse.json({
      message: `User DELETE Transaction Failed: ${e}`,
    });
  }
}
