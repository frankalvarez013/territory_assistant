import { NextRequest,NextResponse } from "next/server";
import { NextApiRequest } from "next";
import {z} from "zod"
import prisma from '@/prisma/client'

const createTerritorySchema = z.object({
    location: z.string().min(1).max(255),
    AssignedDate: z.date(),
    ExperiationDate: z.date(),
    congregationID: z.string().min(1).max(255),
    currentUserID: z.string().min(1).max(255)
})

export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = createTerritorySchema.safeParse(body);
    if (!validation.success){
        return NextResponse.json(validation.error.errors, {status: 400})
    }
    const newTerritory = await prisma.territory.create({
        data: {
            territoryID: 0,
            location: body.location,
            AssignedDate: body.AssignedDate,
            ExperiationDate: body.ExperiationDate,
            congregationID: body.congregationID,
            currentUserID: body.currentUserID,
        }
    }
    )
    return NextResponse.json(newTerritory,{status: 201})
}

export async function GET(request: NextRequest){
    const idParam = request.nextUrl.searchParams.get("id")
    const territoryID = idParam ? parseInt(idParam) : undefined
    let getTerritory: {} | null = null
    if(territoryID){
        getTerritory = await prisma.territory.findUnique({
            where: {
                territoryID: territoryID
            }
        });
    } else {
        getTerritory = await prisma.territory.findMany({
            where: {
                territoryID: territoryID
            }
        });
    }
    return NextResponse.json(getTerritory,{status:201})
}

export async function UPDATE(request: NextRequest){
    const idParam = request.nextUrl.searchParams.get("id")
    const territoryID = idParam ? parseInt(idParam) : undefined
    const body = await request.json();
    const validation = createTerritorySchema.safeParse(body);
    if (!validation.success){
        return NextResponse.json(validation.error.errors, {status: 400})
    }
    const updatedTerritory = await prisma.territory.update({
        where: {
            territoryID: territoryID
        },
        data: {
            territoryID: body.territoryID,
            location: body.location,
            AssignedDate: body.AssignedDate,
            ExperiationDate: body.ExperiationDate,
            congregationID: body.congregationID,
            currentUserID: body.currentUserID,
        }
    });
    return NextResponse.json(updatedTerritory,{status:201})
}

export async function DELETE(request: NextRequest){
    const idParam = request.nextUrl.searchParams.get("id")
    const territoryID = idParam ? parseInt(idParam) : undefined
    const deletedTerritory = await prisma.territory.delete({
        where: {
            territoryID:territoryID ?? undefined
        }
    });
    return NextResponse.json(deletedTerritory,{status:201})
}