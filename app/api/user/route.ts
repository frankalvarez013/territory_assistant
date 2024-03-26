import { NextRequest, NextResponse } from "next/server";
import { ZodIssue, z } from "zod";
import prisma from "@/prisma/client";
import { User } from "@prisma/client";
import { ErrorResponse } from "@/app/types/api";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
const createUserSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().min(1).max(255),
  congregationID: z.string().min(1).max(255),
  //use zode to check if the isAdmin is true or false "strings"
});
const updateUserSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  email: z.string().min(1).max(255).optional(),
  congregationID: z.string().min(1).max(255).optional(),
  password: z.string().min(1).max(255).optional(),
  //use zod to check if the isAdmin is true or false "strings"
});
export async function POST(
  request: NextRequest
): Promise<NextResponse<User | ZodIssue[] | ErrorResponse>> {
  const body = await request.json();
  const validation = createUserSchema.safeParse(body);
  let isAdmin = false;
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  if (String(body.isAdmin).toLowerCase() === "true") {
    isAdmin = true;
  }
  try {
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
        congregationID: body.congregationID,
        isAdmin: isAdmin,
      },
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: `User POST failed:\n ${e}` });
  }
}

export async function GET(request: NextRequest, response: NextResponse) {
  console.log("GET - User");
  const idParams = request.nextUrl.searchParams.get("id");
  const session = await getServerSession(authOptions);
  let getUser: User | User[] | null = null;
  try {
    if (idParams) {
      getUser = await prisma.user.findUnique({
        where: {
          id: request.nextUrl.searchParams.get("id") ?? undefined,
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
      console.log("Checking Admin Status...");
      if (session?.user.isAdmin) {
        // console.log("Is admin");
        // console.log(session.user.congID);
        const getAdminUsers = await prisma.user.findMany({
          where: {
            congregationID: session.user.congID,
          },
        });
        // console.log("returning...", getAdminUsers);
        return NextResponse.json(getAdminUsers, { status: 201 });
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
  console.log("hi");
  const body = await request.json();
  console.log(body);
  const validation = updateUserSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  console.log("INSIDE");
  const updateData: { [key: string]: any } = {};
  for (const [key, value] of Object.entries(body)) {
    if (value !== undefined) {
      if (key === "isAdmin") {
        let isAdmin = false;
        if (String(value).toLowerCase() === "true") {
          isAdmin = true;
        }
        updateData[key] = isAdmin;
      } else {
        updateData[key] = value;
      }
    }
  }
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: request.nextUrl.searchParams.get("id") ?? undefined,
      },
      data: updateData,
    });
    return NextResponse.json(updatedUser, { status: 201 });
  } catch (e) {
    return NextResponse.json({
      message: `User UPDATE Transaction Failed\n: ${e}`,
    });
  }
}

export async function DELETE(
  request: NextRequest
): Promise<NextResponse<User | ErrorResponse>> {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: request.nextUrl.searchParams.get("id") ?? undefined,
      },
    });
    return NextResponse.json(deletedUser, { status: 201 });
  } catch (e) {
    return NextResponse.json({
      message: `User DELETE Transaction Failed: ${e}`,
    });
  }
}
