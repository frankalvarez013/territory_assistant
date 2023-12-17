import { NextRequest,NextResponse } from "next/server";
import { NextApiRequest } from "next";
import {z} from "zod"
import prisma from '@/prisma/client'
const createCongregationSchema = z.object({
    congregationName: z.string().min(1).max(255),
    address: z.string().min(1).max(255)
})

export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = createCongregationSchema.safeParse(body);
    if (!validation.success){
        return NextResponse.json(validation.error.errors, {status: 400})
    }
    const newCongregation = await prisma.congregation.create({
        data: {
            congregationName:body.congregationName, 
            address: body.address
        }
    }
    )
    return NextResponse.json(newCongregation,{status: 201})
}

export async function GET(request: NextRequest){
     const congregation = await prisma.congregation.findUnique({
        where: {
            id: request.nextUrl.searchParams.get("id") ?? undefined
        }
    });
    return NextResponse.json(congregation,{status:201})
}
export async function GETALL(request: NextRequest){
    const congregation = await prisma.congregation.findMany({});
   return NextResponse.json(congregation,{status:201})
}
export async function UPDATE(request: NextRequest){
    const body = await request.json();
    const validation = createCongregationSchema.safeParse(body);
    if (!validation.success){
        return NextResponse.json(validation.error.errors, {status: 400})
    }
    const allCongregations = await prisma.congregation.update({
        where: {
            id: request.nextUrl.searchParams.get("id") ?? undefined
        },
        data: {
            congregationName:body.congregationName, 
            address: body.address
        }
    });
    return NextResponse.json(allCongregations,{status:201})
}

export async function DELETE(request: NextRequest){

    const allCongregations = await prisma.congregation.delete({
        where: {
            id: request.nextUrl.searchParams.get("id") ?? undefined
        }
    });
    return NextResponse.json(allCongregations,{status:201})
}