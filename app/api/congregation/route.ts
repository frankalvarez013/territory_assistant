import { NextRequest,NextResponse } from "next/server";
import { NextApiRequest } from "next";
import {z} from "zod"
import prisma from '@/prisma/client'
const createCongregationSchema = z.object({
    congregationName: z.string().min(1).max(255),
    address: z.string().min(1).max(255)
})
const updateCongregationSchema = z.object({
    congregationName: z.string().min(1).max(255).optional(),
    address: z.string().min(1).max(255).optional()
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
    const idParam = request.nextUrl.searchParams.get("id")
    let getCongregation: {} | null = null
    if (idParam){
        getCongregation = await prisma.congregation.findUnique({
            where: {
                id: request.nextUrl.searchParams.get("id") ?? undefined
            }
        });
    } else {
        getCongregation = await prisma.congregation.findMany({});
    }
    return NextResponse.json(getCongregation,{status:201})
}

export async function PATCH(request: NextRequest){
    const body = await request.json();
    const validation = updateCongregationSchema.safeParse(body);
    if (!validation.success){
        return NextResponse.json(validation.error.errors, {status: 400})
    }
    const updateData : {[key: string]:any} = {}
    for (const [key,value] of Object.entries(body)){
        if(value!=undefined){
            updateData[key] = value
        }
    }
    const updateCongregation = await prisma.congregation.update({
        where: {
            id: request.nextUrl.searchParams.get("id") ?? undefined
        },
        data: updateData
    });
    return NextResponse.json(updateCongregation,{status:201})
}

export async function DELETE(request: NextRequest){
    
    const deletedCongregation = await prisma.congregation.delete({
        where: {
            id: request.nextUrl.searchParams.get("id") ?? undefined
        }
    });
    return NextResponse.json(deletedCongregation,{status:201})
}