import { NextRequest,NextResponse } from "next/server";
import { NextApiRequest } from "next";
import {z} from "zod"
import prisma from '@/prisma/client'

export async function GET(request: NextRequest){
    const territoryID = request.nextUrl.searchParams.get("id")
    const territoryIDCheck = territoryID ? parseInt(territoryID) : undefined
    let getCounter: {} | null = null
    if(territoryIDCheck){
        getCounter = await prisma.houseCounter.findUnique({
            where: {
                territoryID: territoryIDCheck,
            }
        });
        return NextResponse.json(getCounter,{status:201})
    } else {
        getCounter = await prisma.houseCounter.findMany({});
        return NextResponse.json(getCounter,{status:201})
    }
}

export async function DELETE(request: NextRequest){
    const territoryID = request.nextUrl.searchParams.get("id")
    const territoryCheck = territoryID ? parseInt(territoryID) : undefined
    let getCounter: {} | null=null
    if(territoryCheck){
        getCounter = await prisma.houseCounter.delete({
            where: {
                territoryID: territoryCheck,
            }
        })
    }
    return NextResponse.json(getCounter,{status:201})
}