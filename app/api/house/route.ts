import { NextRequest,NextResponse } from "next/server";
import { NextApiRequest } from "next";
import {z} from "zod"
import prisma from '@/prisma/client'
import { comment } from "postcss";

const createHouseSchema = z.object({
    territoryID: z.number().positive().finite(),
    StreetAd: z.string().min(1).max(255),
    dateVisited: z.date(),
    comment: z.string().min(1).max(255),
    observation: z.enum(["EMPTY","VISITED","DONTVISIT","DOG","NIGHT"])
})

export async function POST(request: NextRequest){
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
     const congregation = await prisma.house.findUnique({
        where: {
            territoryID: territoryID?? undefined,
            StreetAd: streetAd?? undefined
        }
    });
    return NextResponse.json(congregation,{status:201})
}
export async function GETALL(request: NextRequest){
    const idParam = request.nextUrl.searchParams.get("TerritoryID")
    const territoryID = idParam ? parseInt(idParam) : undefined
     const congregation = await prisma.house.findMany({
        where: {
            territoryID: territoryID?? undefined,
        }
    });
    return NextResponse.json(congregation,{status:201})
}

export async function UPDATE(request: NextRequest){
    const idParam = request.nextUrl.searchParams.get("TerritoryID")
    const streetdAdParam = request.nextUrl.searchParams.get("StreetAd")
    const streetAd = streetdAdParam ? streetdAdParam : undefined
    const territoryID = idParam ? parseInt(idParam) : undefined
    const body = await request.json();
    const validation = createHouseSchema.safeParse(body);
    if (!validation.success){
        return NextResponse.json(validation.error.errors, {status: 400})
    }
    const user = await prisma.house.update({
        where: {
            territoryID: territoryID?? undefined,
            StreetAd: streetAd?? undefined
        },
        data: {
            territoryID: body.territoryID,
            StreetAd: body.StreetAd,
            dateVisited: body.dateVisited,
            comment: body.comment,
            observation: body.observation,
        }
    });
    return NextResponse.json(user,{status:201})
}

export async function DELETE(request: NextRequest){
    const idParam = request.nextUrl.searchParams.get("TerritoryID")
    const streetdAdParam = request.nextUrl.searchParams.get("StreetAd")
    const streetAd = streetdAdParam ? streetdAdParam : undefined
    const territoryID = idParam ? parseInt(idParam) : undefined
     const congregation = await prisma.house.delete({
        where: {
            territoryID: territoryID?? undefined,
            StreetAd: streetAd?? undefined
        }
    });
    return NextResponse.json(congregation,{status:201})
}