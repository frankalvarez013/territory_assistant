import { NextRequest,NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import {ZodIssue, z} from "zod"
import prisma from '@/prisma/client'
import { ErrorResponse } from "@/app/types/api";
import type { Congregation } from "@prisma/client";
const createCongregationSchema = z.object({
    congregationName: z.string().min(1).max(255),
    address: z.string().min(1).max(255)
})
const updateCongregationSchema = z.object({
    congregationName: z.string().min(1).max(255).optional(),
    address: z.string().min(1).max(255).optional()
})

export async function POST(request: NextRequest): Promise<NextResponse<Congregation | ZodIssue[] | ErrorResponse>>{
    const body:Congregation = await request.json();
    const validation = createCongregationSchema.safeParse(body);
    if (!validation.success){
        return NextResponse.json(validation.error.errors, {status: 400})
    }
    try{
        const newCongregation = await prisma.congregation.create({
            data: {
                congregationName:body.congregationName, 
                address: body.address
            }
        }
        )
        return NextResponse.json(newCongregation,{status: 201})
    } catch (e){
        return NextResponse.json({message: `Congregation POST Transaction failed:\n ${e}`}, {status: 404})
    }
   
}

export async function GET(request: NextRequest, res:NextApiResponse): Promise<NextResponse<Congregation | Congregation[] | ErrorResponse | undefined>>{
    const idParam = request.nextUrl.searchParams.get("id")
    let getCongregation: Congregation | Congregation[] | null = null
    if (idParam){
        console.log("inside with idParam",idParam)
        try{
            getCongregation = await prisma.congregation.findUnique({
                where: {
                    id:idParam
                }
            });
        }catch (e){
            console.log(e)
            return NextResponse.json({message: `Congregation GET Transaction failed:\n ${e}`}, {status: 404})
        }
        
    } else {
        getCongregation = await prisma.congregation.findMany({});
    }
    if(!getCongregation){
        console.log("Congregation Record not Found:\n",getCongregation)
        return NextResponse.json({message: "Congregation Record not Found:\n"}, {status: 404})
    }
    console.log("Hey")
    console.log(getCongregation)
    res.status(200).json(getCongregation)
}

export async function PATCH(request: NextRequest): Promise<NextResponse<Congregation | ZodIssue[] | ErrorResponse>>{
    const body:Congregation = await request.json();
    const validation = updateCongregationSchema.safeParse(body);
    if (!validation.success){
        return NextResponse.json(validation.error.errors, {status: 400})
    }
    const updateData : {[key: string]:string} = {}
    for (const [key,value] of Object.entries(body)){
        if(value!=undefined){
            updateData[key] = value
        }
    }
    try{
        const updateCongregation = await prisma.congregation.update({
            where: {
                id: request.nextUrl.searchParams.get("id") ?? undefined
            },
            data: updateData
        });
        return NextResponse.json(updateCongregation,{status:201})
    } catch (e){
        return NextResponse.json({message: `Congregation UPDATE Transaction failed\n: ${e}`}, {status: 404})
    }
  
}

export async function DELETE(request: NextRequest): Promise<NextResponse<Congregation | ErrorResponse>>{
    const idParam = request.nextUrl.searchParams.get("id")
    console.log(idParam)
    try{
        const deletedCongregation = await prisma.congregation.delete({
            where: {
                id: request.nextUrl.searchParams.get("id") ?? undefined
            }
        });
        return NextResponse.json(deletedCongregation,{status:201})
    } catch (e){
        return NextResponse.json({message: `Congregation DELETE Transaction failed\n: ${e}`}, {status: 404})
    }
}