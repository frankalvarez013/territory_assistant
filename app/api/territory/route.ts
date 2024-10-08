import { NextRequest, NextResponse } from "next/server";
import { ZodIssue, z } from "zod";
import { Prisma } from "@prisma/client";
import prisma from "@/prisma/client";
import type { Congregation, Territory, User } from "@prisma/client";
import { CustomSession, ErrorResponse, territoryJSON } from "@/app/types/api";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";

import { TerritoryComment } from "@prisma/client";
const createTerritorySchema = z.object({
  territoryID: z.string().min(1).max(255),
  location: z.string().min(1).max(255),
});

const updateTerritorySchema = z.object({
  territoryID: z.string().min(1).max(255),
  congregationID: z.string().min(1).max(255),
  currentUserID: z.string().min(1).max(255).optional(),
  dateLength: z.string().min(1).max(255).optional().nullable(),
  date: z.string().min(1).max(255).optional().nullable(),
});
export async function POST(
  request: NextRequest
): Promise<NextResponse<Territory | ErrorResponse | ZodIssue[]>> {
  const body = await request.json();
  const validation = createTerritorySchema.safeParse(body);
  const timeUserKeepsTerritory = 30;
  const date = new Date();
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  const endDate = ExperiationDateCalculator(date, timeUserKeepsTerritory);
  try {
    console.log("Logging Admin...");
    const session = (await getServerSession(authOptions)) as CustomSession;
    if (session?.user?.isAdmin) {
      console.log("Creating Terr");
      const newTerritory = await prisma.query.territory.create({
        args: {
          data: {
            territoryID: validation.data.territoryID,
            location: validation.data.location,
            AssignedDate: date,
            ExperiationDate: endDate,
            congregationID: session.user.congID!,
            currentUserID: session.user.id!,
          },
        },
        query: (args) => prisma.territory.create(args),
      });
      console.log("finished Adding Territory....");

      return NextResponse.json(
        {
          ...newTerritory,
          AssignedDate: date,
          ExperiationDate: endDate,
        },
        { status: 201 }
      );
    }
  } catch (e) {
    // Log any error that occurs during the database operation
    console.error("Error creating new territory:\n", e);

    // Return an error response
    return NextResponse.json(
      { message: `Territory POST Transaction failed:\n ${e}` },
      { status: 500 }
    );
  }
  return NextResponse.json({ message: `Territory POST Transaction failed:\n ` }, { status: 500 });
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<Territory | Territory[] | ErrorResponse>> {
  const terrID = request.nextUrl.searchParams.get("terrID");
  const congID = request.nextUrl.searchParams.get("congID");
  const terrIdCheck = terrID ? terrID : undefined;
  console.log(terrID, congID);
  const session = (await getServerSession(authOptions)) as CustomSession;
  let getTerritory: Territory | Territory[] | null = null;
  let getCong: Congregation | null = null;
  try {
    if (congID && terrID) {
      getCong = await prisma.congregation.findUnique({
        where: {
          id: congID,
        },
      });
      if (terrIdCheck && getCong) {
        console.log("");
        getTerritory = await prisma.territory.findUnique({
          where: {
            territoryID_congregationID: {
              territoryID: terrIdCheck,
              congregationID: getCong?.id,
            },
          },
          include: {
            houses: true,
          },
        });
        console.log("oi", getCong);
      }
      if (!getTerritory) {
        return NextResponse.json({ message: "Territory Record not found" });
      }
      return NextResponse.json(getTerritory, { status: 201 });
    }
    getTerritory = await prisma.territory.findMany({
      where: {
        congregationID: session!.user!.congID,
      },
      include: {
        currentUser: true,
      },
    });
    if (!getTerritory) {
      return NextResponse.json({ message: "Territory Record not found" });
    }
    // console.log(getTerritory);
    return NextResponse.json(getTerritory, { status: 201 });
  } catch (e) {
    console.error("bruh", e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ message: `DB error occured:\n ${e}` }, { status: 500 });
    } else if (e instanceof Prisma.PrismaClientUnknownRequestError) {
      return NextResponse.json(
        { message: `Unknown database error occurred:\n ${e}` },
        { status: 500 }
      );
    } else if (e instanceof Prisma.PrismaClientRustPanicError) {
      return NextResponse.json({ message: `Rust panic error occurred:\n ${e}` }, { status: 500 });
    } else if (e instanceof Prisma.PrismaClientInitializationError) {
      return NextResponse.json(
        { message: `Database initialization error occurred:\n ${e}` },
        { status: 500 }
      );
    } else if (e instanceof Prisma.PrismaClientValidationError) {
      return NextResponse.json({ message: `Validation error occurred:\n ${e}` }, { status: 500 });
    } else {
      return NextResponse.json({ message: `Internal Server Error:\n ${e}` }, { status: 500 });
    }
  }
}

export async function PATCH(
  request: NextRequest
): Promise<NextResponse<Territory | ErrorResponse | ZodIssue[]>> {
  const body = await request.json();
  const validation = updateTerritorySchema.safeParse(body);
  const session = await getServerSession(authOptions);
  if (!validation.success) {
    console.log("sessionoof");
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  const updateData: { [key: string]: any } = {};
  for (const [key, value] of Object.entries(body)) {
    if (value !== undefined && key != "dateLength") {
      if (key === "date") {
        console.log(validation.data.dateLength);
        const dateLengthStr: string = validation.data.dateLength || "30";
        const dateLength = parseInt(dateLengthStr);
        const date = new Date(validation.data.date!);
        console.log("new dateee obj", date);
        console.log(dateLength);
        const endDate = ExperiationDateCalculator(date, dateLength + 1);
        updateData["AssignedDate"] = date;
        updateData["ExperiationDate"] = endDate;
      } else {
        if (key === "currentUserID") {
          console.log("Checking if its a current User...");
          const user: User | null = await prisma.user.findUnique({
            where: {
              id: validation.data.currentUserID!,
            },
          });
          if (user) {
            if (validation.data.congregationID != user.congregationID) {
              console.log("Checking if its a good ID match...");

              return NextResponse.json(
                {
                  message: "The User must be a part of the congregation that owns the territory",
                },
                { status: 412 }
              );
            }
            if (!user.isAdmin) {
              updateData["activity"] = TerritoryComment.Assigned;
              updateData["currentUserID"] = validation.data.currentUserID;
            } else {
              updateData["activity"] = TerritoryComment.Available;
              updateData["currentUserID"] = validation.data.currentUserID;
            }
          } else {
            return NextResponse.json({
              message: "No User Found",
            });
          }
        } else {
          updateData[key] = value;
        }
      }
    }
  }

  if (body.territoryID && body.congregationID) {
    console.log("brudder");
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
      console.log("terr updated");

      if (!updatedTerritory) {
        return NextResponse.json({ message: "Territory Record was not found" });
      }
      return NextResponse.json(updatedTerritory, { status: 201 });
    } catch (e) {
      console.error("Error creating new territory:\n", e);
      return NextResponse.json({
        message: `Territory Update Transaction failed:\n ${e}`,
      });
    }
  } else {
    return NextResponse.json({
      message: "Make sure the parameters are correctly set with the correct types.",
    });
  }
}

export async function DELETE(
  request: NextRequest
): Promise<NextResponse<Territory | ErrorResponse>> {
  const terrId = request.nextUrl.searchParams.get("terrId");
  const terrIdCheck = terrId ? terrId : undefined;
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
        message: "Make sure the parameters are correctly set with the correct types.",
      });
    }
  } else {
    return NextResponse.json({
      message: "Make sure the parameters are correctly set with the correct types.",
    });
  }
  return NextResponse.json({ message: "" });
}

function ExperiationDateCalculator(date: Date, daysToAdd: number): Date {
  var result = new Date(date);
  result.setDate(result.getDate() + daysToAdd);
  return result;
}
