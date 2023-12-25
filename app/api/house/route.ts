import { NextRequest,NextResponse } from "next/server";
import { NextApiRequest } from "next";
import {ZodIssue, z} from "zod"
import prisma from '@/prisma/client'
import { comment } from "postcss";
import type { House } from "@prisma/client";
import { ErrorResponse } from "@/app/types/api";
const createHouseSchema = z.object({
    territoryID: z.number().positive().finite(),
    StreetAd: z.string().min(1).max(255),
    dateVisited: z.date(),
    comment: z.string().min(1).max(255),
    observation: z.enum(["EMPTY","VISITED","DONTVISIT","DOG","NIGHT"])
})
const updateHouseSchema = z.object({
    territoryID: z.number().positive().finite().optional(),
    StreetAd: z.string().min(1).max(255).optional(),
    dateVisited: z.date().optional(),
    comment: z.string().min(1).max(255).optional(),
    observation: z.enum(["EMPTY","VISITED","DONTVISIT","DOG","NIGHT"]).optional()
    //use zod to check if the isAdmin is true or false "strings"
})
export async function POST(request: NextRequest): Promise<NextResponse< House | ErrorResponse | ZodIssue[]>>{
    const body = await request.json();
    const validation = createHouseSchema.safeParse(body);
    if (!validation.success){
        return NextResponse.json(validation.error.errors, {status: 400})
    }
    
    const newHouse = await prisma.house.create({
        data: {
            houseID: 0,
            territoryID: body.territoryID,
            congregationID: body.congregationID,
            StreetAd: body.StreetAd,
            dateVisited: body.dateVisited,
            comment: body.comment,
            observation: body.observation,
        }
    }
    )
    return NextResponse.json(newHouse,{status: 201})
}

export async function GET(request: NextRequest){
    const idParam = request.nextUrl.searchParams.get("TerritoryID")
    const streetdAdParam = request.nextUrl.searchParams.get("StreetAd")
    const streetAd = streetdAdParam ? streetdAdParam : undefined
    const territoryID = idParam ? parseInt(idParam) : undefined
    let getHouse: {} | null = null
    if(territoryID){
        getHouse = await prisma.house.findUnique({
            where: {
                territoryID: territoryID?? undefined,
                StreetAd: streetAd?? undefined
            }
        });
    } else {
        getHouse = await prisma.house.findMany({
            where: {
                territoryID: territoryID?? undefined,
            }
        });
    }
     
    return NextResponse.json(getHouse,{status:201})
}

export async function UPDATE(request: NextRequest){
    const idParam = request.nextUrl.searchParams.get("TerritoryID")
    const streetdAdParam = request.nextUrl.searchParams.get("StreetAd")
    const streetAd = streetdAdParam ? streetdAdParam : undefined
    const territoryID = idParam ? parseInt(idParam) : undefined
    const body = await request.json();
    const validation = updateHouseSchema.safeParse(body);
    if (!validation.success){
        return NextResponse.json(validation.error.errors, {status: 400})
    }
    const updateData: { [key: string]: any} = {}
    for (const [key,value] of Object.entries(body)){
        if(value!==undefined){
            updateData[key] = value;
        }
    }
    const updatedHouse = await prisma.house.update({
        where: {
            territoryID: territoryID?? undefined,
            StreetAd: streetAd?? undefined
        },
        data: updateData
    });
    return NextResponse.json(updatedHouse,{status:201})
}

export async function DELETE(request: NextRequest){
    const idParam = request.nextUrl.searchParams.get("TerritoryID")
    const streetdAdParam = request.nextUrl.searchParams.get("StreetAd")
    const streetAd = streetdAdParam ? streetdAdParam : undefined
    const territoryID = idParam ? parseInt(idParam) : undefined
     const deletedHouse = await prisma.house.delete({
        where: {
            territoryID: territoryID?? undefined,
            StreetAd: streetAd?? undefined
        }
    });
    return NextResponse.json(deletedHouse,{status:201})
}