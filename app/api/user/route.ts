import { NextRequest,NextResponse } from "next/server";
import { NextApiRequest } from "next";
import {z} from "zod"
import prisma from '@/prisma/client'
const createUserSchema = z.object({
    fName: z.string().min(1).max(255),
    lName: z.string().min(1).max(255),
    email: z.string().min(1).max(255),
    congregationID: z.string().min(1).max(255),
    //use zode to check if the isAdmin is true or false "strings"
})

export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = createUserSchema.safeParse(body);
    let isAdmin1 = false
    if (!validation.success){
        return NextResponse.json(validation.error.errors, {status: 400})
    }
    if(String(body.isAdmin).toLowerCase() === "true"){
        isAdmin1 = true
    }
    const newUser = await prisma.user.create({
        data: {
            fName: body.fName,
            lName: body.lName,
            email: body.email,
            congregationID: body.congregationID,
            isAdmin: isAdmin1
        }
    }
    )
    return NextResponse.json(newUser,{status: 201})
}
export async function GET(request: NextRequest){
    const idParams = request.nextUrl.searchParams.get("id")
    let getUser: {} | null = null
    if (idParams){
        getUser = await prisma.user.findUnique({
            where: {
                id: request.nextUrl.searchParams.get("id") ?? undefined
            }
        });
    } else {
        getUser = await prisma.user.findMany({});
    }
    
   return NextResponse.json(getUser,{status:201})
}

export async function UPDATE(request: NextRequest){
    const body = await request.json();
    const validation = createUserSchema.safeParse(body);
    if (!validation.success){
        return NextResponse.json(validation.error.errors, {status: 400})
    }
    const updatedUser = await prisma.user.update({
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
    return NextResponse.json(updatedUser,{status:201})
}

export async function DELETE(request: NextRequest){
    const deletedUser = await prisma.user.delete({
        where: {
            id: request.nextUrl.searchParams.get("id") ?? undefined
        }
    });
    return NextResponse.json(deletedUser,{status:201})
}