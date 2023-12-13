import { NextRequest,NextResponse } from "next/server";
import { NextApiRequest } from "next";
import {z} from "zod"
import prisma from '@/prisma/client'
const createUserSchema = z.object({
    id: z.string().min(1).max(255),
    congregationID: z.string().min(1).max(255)
})

export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = createUserSchema.safeParse(body);
    if (!validation.success){
        return NextResponse.json(validation.error.errors, {status: 400})
    }
    const newUser = await prisma.user.create({
        data: {
            fName: body.fName,
            lName: body.lName,
            email: body.email,
            congregationID: body.congregationID
        }
    }
    )
    return NextResponse.json(newUser,{status: 201})
}

export async function GET(request: NextRequest){
     const congregation = await prisma.user.findUnique({
        where: {
            id: request.nextUrl.searchParams.get("id") ?? undefined
        }
    });
    return NextResponse.json(congregation,{status:201})
}

export async function UPDATE(request: NextRequest){
    const body = await request.json();
    const validation = createUserSchema.safeParse(body);
    if (!validation.success){
        return NextResponse.json(validation.error.errors, {status: 400})
    }
    const user = await prisma.user.update({
        where: {
            id: request.nextUrl.searchParams.get("id") ?? undefined
        },
        data: {
            fName: body.fName,
            lName: body.lName,
            email: body.email,
            congregationID: body.congregationID
        }
    });
    return NextResponse.json(user,{status:201})
}

export async function DELETE(request: NextRequest){
    const user = await prisma.user.delete({
        where: {
            id: request.nextUrl.searchParams.get("id") ?? undefined
        }
    });
    return NextResponse.json(user,{status:201})
}