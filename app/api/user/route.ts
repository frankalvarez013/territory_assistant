import { NextRequest, NextResponse } from "next/server";
import { ZodIssue, z } from "zod";
import prisma from "@/prisma/client";
import { TerritoryComment, User } from "@prisma/client";
import { CustomSession, ErrorResponse } from "@/app/types/api";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Role } from "@prisma/client";
const createUserSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().min(1).max(255),
  congregationID: z.string().min(1).max(255),
  isAdmin: z.boolean().optional(),
  isGeneralAdmin: z.boolean().optional(),
  Role: z.enum(["Elder", "MS", "Approved"]).optional(),
  //use zode to check if the isAdmin is true or false "strings"
});
const updateUserSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  email: z.string().min(1).max(255).optional(),
  congregationID: z.string().min(1).max(255).optional(),
  password: z.string().min(1).max(255).optional(),
  isAdmin: z.boolean().optional(),
  Role: z.enum(["Elder", "MS", "Approved"]).optional(),

  //use zod to check if the isAdmin is true or false "strings"
});
export async function POST(
  request: NextRequest
): Promise<NextResponse<User | ZodIssue[] | ErrorResponse>> {
  const body = await request.json();
  const validation = createUserSchema.safeParse(body);
  let isAdmin = false;
  let isGAdmin = false;
  let role: Role = Role.Approved;
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  if (String(validation.data.isAdmin).toLowerCase() === "true") {
    isAdmin = true;
  }
  if (String(validation.data.isGeneralAdmin).toLowerCase() === "true") {
    isGAdmin = true;
  }
  if (String(validation.data.isGeneralAdmin).toLowerCase() === "true") {
    isGAdmin = true;
  }
  if (validation.data.Role) {
    role = validation.data.Role;
  }
  try {
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
        congregationID: body.congregationID,
        isAdmin: isAdmin,
        isGeneralAdmin: isGAdmin,
        Role: role,
      },
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (e) {
    console.error("User POST failed:", e);
    return NextResponse.json({ message: `User POST failed:\n ${e}` }, { status: 409 });
  }
}

export async function GET(request: NextRequest, response: NextResponse) {
  const idParams = request.nextUrl.searchParams.get("id");
  const session = (await getServerSession(authOptions)) as CustomSession;
  let getUser: User | User[] | null = null;
  try {
    if (idParams) {
      getUser = await prisma.user.findUnique({
        where: {
          id: request.nextUrl.searchParams.get("id") ?? undefined,
          isGeneralAdmin: false,
        },
      });
      if (getUser) {
        //attaches territories from users to result array.
        const territories = await prisma.territory.findMany({
          where: {
            currentUserID: getUser.id,
          },
        });
        const total = [];
        total.push(getUser, territories);
        return NextResponse.json(total, { status: 201 });
      }
    } else {
      // console.log("Checking Admin Status...");
      if (session?.user!.isAdmin) {
        // console.log("Is admin");
        // console.log(session.user.congID);
        const getAdminUsers = await prisma.user.findMany({
          where: {
            congregationID: session.user.congID,
            isGeneralAdmin: false,
          },
        });
        // console.log("returning...", getAdminUsers);
        return NextResponse.json(getAdminUsers, { status: 201 });
      }
      if (session?.user!.isGeneralAdmin) {
        const congID = request.nextUrl.searchParams.get("congID");
        getUser = await prisma.user.findMany({
          where: {
            congregationID: congID ?? undefined,
            isGeneralAdmin: false,
          },
        });
        return NextResponse.json(getUser, { status: 201 });
      }
    }
    if (!getUser) {
      return NextResponse.json({ message: "User Record not found" });
    }
    return NextResponse.json(getUser, { status: 201 });
  } catch (e) {
    return NextResponse.json({
      message: `USER GET transaction failed:\n ${e}`,
    });
  }
}
export async function PATCH(
  request: NextRequest
): Promise<NextResponse<User | ZodIssue[] | ErrorResponse>> {
  // console.log("hi");
  const body = await request.json();
  // console.log(body);
  const validation = updateUserSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  let adminFalseAction = false;
  let changingCongregations = false;
  let oldCongregation: {} | null = null;
  const updateData: { [key: string]: any } = {};
  for (const [key, value] of Object.entries(body)) {
    if (value !== undefined) {
      if (key === "isAdmin") {
        console.log("isAdmin");
        let isAdmin = false;
        if (String(value).toLowerCase() === "true") {
          isAdmin = true;
          adminFalseAction = true;
        }
        updateData[key] = isAdmin;
      }
      if (key === "congregationID") {
        changingCongregations = true;
        oldCongregation = value;
        updateData["congregation"] = { connect: { id: value } };
      } else {
        updateData[key] = value;
      }
    }
  }
  const oldUser = await prisma.user.findUnique({
    where: {
      id: request.nextUrl.searchParams.get("id") ?? undefined,
    },
  });
  console.log("checkin4");
  try {
    let updatedTerritories = null;
    console.log("brudder");
    const updatedUser = await prisma.user.update({
      where: {
        id: request.nextUrl.searchParams.get("id") ?? undefined,
        isGeneralAdmin: false,
      },
      data: updateData,
    });
    console.log("oi", updatedUser);

    if (adminFalseAction || changingCongregations) {
      console.log("adminFalse OR Changing Congregations");
      if (adminFalseAction) {
        updatedTerritories = await prisma.territory.updateMany({
          where: {
            currentUserID: request.nextUrl.searchParams.get("id") ?? undefined,
            congregationID: oldUser!.congregationID,
          },
          data: {
            currentUserID: null,
          },
        });
      } else {
        console.log(request.nextUrl.searchParams.get("id"), oldCongregation);
        try {
          updatedTerritories = await prisma.territory.updateMany({
            where: {
              currentUserID: request.nextUrl.searchParams.get("id") ?? undefined,
              congregationID: oldUser!.congregationID,
            },
            data: {
              currentUserID: null,
              activity: TerritoryComment.Available,
            },
          });
        } catch (e) {
          console.log(e);
        }
      }
    }

    return NextResponse.json(updatedUser, { status: 201 });
  } catch (e) {
    console.error("User POST failed:", e);
    return NextResponse.json({ message: `User UPDATE failed:\n ${e}` }, { status: 409 });
  }
}

export async function DELETE(
  request: NextRequest
): Promise<NextResponse<User | ZodIssue[] | ErrorResponse>> {
  const id = request.nextUrl.searchParams.get("id");

  if (!id || id === null) {
    console.error(`ID is necessary for DELETE Transaction`);
    return NextResponse.json({
      message: `ID is necessary for DELETE Transaction`,
    });
  }
  try {
    const deletedUser = await prisma.query.user.delete({
      args: {
        where: {
          //id is not recognized...
          id: id,
          isGeneralAdmin: false,
        },
      },
      query: (args) => prisma.user.delete(args),
    });

    return NextResponse.json(deletedUser, { status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      message: `User DELETE Transaction Failed: ${e}`,
    });
  }
}
