import { NextRequest, NextResponse } from "next/server";
import { ZodIssue, z } from "zod";
import prisma from "@/prisma/client";
import type { Territory } from "@prisma/client";
import { ErrorResponse, territoryJSON } from "@/app/types/api";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
const createTerritorySchema = z.object({
  location: z.string().min(1).max(255),
  dateLength: z.string().min(1).max(255),
  congregationID: z.string().min(1).max(255),
  currentUserID: z.string().min(1).max(255),
});
const updateTerritorySchema = z.object({
  territoryID: z.number().positive().finite(),
  congregationID: z.string().min(1).max(255),
  currentUserID: z.string().min(1).max(255),
  dateLength: z.string().min(1).max(255).optional(),
  location: z.string().min(1).max(255).optional(),
});
export async function POST(
  request: NextRequest
): Promise<NextResponse<territoryJSON | ZodIssue[] | ErrorResponse>> {
  const body = await request.json();
  const validation = createTerritorySchema.safeParse(body);
  const timeUserKeepsTerritory = parseInt(body.dateLength);
  const defaultVal = 1;
  const date = new Date();
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  const endDate = ExperiationDateCalculator(date, timeUserKeepsTerritory);
  try {
    const newTerritory = await prisma.territory.create({
      data: {
        territoryID: defaultVal,
        location: body.location,
        AssignedDate: date,
        ExperiationDate: endDate,
        congregationID: body.congregationID,
        currentUserID: body.currentUserID,
      },
    });
    return NextResponse.json(
      {
        ...newTerritory,
        AssignedDate: date.toISOString(),
        ExperiationDate: endDate.toISOString(),
      },
      { status: 201 }
    );
  } catch (e) {
    // Log any error that occurs during the database operation
    console.error("Error creating new territory:\n", e);

    // Return an error response
    return NextResponse.json(
      { message: `Territory POST Transaction failed:\n ${e}` },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const terrId = request.nextUrl.searchParams.get("terrId");
  const terrIdCheck = terrId ? parseInt(terrId) : undefined;
  const congId = request.nextUrl.searchParams.get("congId");
  const congIdCheck = congId ? congId : undefined;
  const session = await getServerSession(authOptions);
  let getTerritory: Territory | Territory[] | null = null;
  try {
    if (congIdCheck && typeof terrIdCheck === "number") {
      getTerritory = await prisma.territory.findUnique({
        where: {
          territoryID_congregationID: {
            territoryID: terrIdCheck,
            congregationID: congIdCheck,
          },
        },
      });
    } else {
      // console.log("Checking Admin Status...");
      if (session?.user.isAdmin) {
        const getTerritories = await prisma.territory.findMany({
          where: {
            congregationID: session.user.congID,
          },
          include: {
            currentUser: true,
          },
        });
        return NextResponse.json(getTerritories, { status: 201 });
      }
    }
    if (!getTerritory) {
      return NextResponse.json({ message: "Territory Record not found" });
    }
    return NextResponse.json(getTerritory, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { message: `Territory GET Transaction failed:\n ${e}` },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest
): Promise<NextResponse<Territory | ErrorResponse | ZodIssue[]>> {
  console.log("inside patch");
  const body = await request.json();
  console.log(body);
  const validation = updateTerritorySchema.safeParse(body);
  console.log("OI");

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  console.log("OI");
  const updateData: { [key: string]: any } = {};
  for (const [key, value] of Object.entries(body)) {
    if (value !== undefined) {
      if (key == "dateLength") {
        const dateLengthStr: string = body.dateLength;
        const dateLength = parseInt(dateLengthStr);
        const date = new Date();
        const endDate = ExperiationDateCalculator(date, dateLength);
        updateData["AssignedDate"] = date;
        updateData["ExperiationDate"] = endDate;
      } else {
        updateData[key] = value;
      }
    }
  }
  console.log(body.territoryID, body.congregationID);
  if (body.territoryID && body.congregationID) {
    console.log("trying to update...");
    try {
      const updatedTerritory = await prisma.territory.update({
        where: {
          territoryID_congregationID: {
            territoryID: body.territoryID,
            congregationID: body.congregationID.toString(),
          },
        },
        data: updateData,
      });
      if (!updatedTerritory) {
        return NextResponse.json({ message: "Territory Record was not found" });
      }
      console.log("UPDATED VERSION - ", updatedTerritory);
      return NextResponse.json(updatedTerritory, { status: 201 });
    } catch (e) {
      console.error("Error creating new territory:\n", e);
      return NextResponse.json({
        message: `Territory Update Transaction failed:\n ${e}`,
      });
    }
  } else {
    return NextResponse.json({
      message:
        "Make sure the parameters are correctly set with the correct types.",
    });
  }
}

export async function DELETE(
  request: NextRequest
): Promise<NextResponse<Territory | ErrorResponse>> {
  const terrId = request.nextUrl.searchParams.get("terrId");
  const terrIdCheck = terrId ? parseInt(terrId) : undefined;
  const congId = request.nextUrl.searchParams.get("congId");
  const congIdCheck = congId ? congId : undefined;
  if (typeof terrIdCheck === typeof 0 && congIdCheck && terrIdCheck != null) {
    try {
      const deletedTerritory = await prisma.territory.delete({
        where: {
          territoryID_congregationID: {
            territoryID: terrIdCheck,
            congregationID: congIdCheck,
          },
        },
      });
      return NextResponse.json(deletedTerritory, { status: 201 });
    } catch (e) {
      return NextResponse.json({
        message:
          "Make sure the parameters are correctly set with the correct types.",
      });
    }
  } else {
    return NextResponse.json({
      message:
        "Make sure the parameters are correctly set with the correct types.",
    });
  }
  return NextResponse.json({ message: "" });
}

function ExperiationDateCalculator(date: Date, daysToAdd: number): Date {
  var result = new Date(date);
  result.setDate(result.getDate() + daysToAdd);
  return result;
}
