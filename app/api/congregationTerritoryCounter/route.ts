import { NextRequest,NextResponse } from "next/server";
import { NextApiRequest } from "next";
import {z} from "zod"
import prisma from '@/prisma/client'

export async function GET(request: NextRequest){
    const congregationID = request.nextUrl.searchParams.get("id")
    let getCounter: {} | null = null
    if(congregationID){
        getCounter = await prisma.congregationTerritoryCounter.findUnique({
            where: {
                congregationID: congregationID,
            }
        });
        return NextResponse.json(getCounter,{status:201})
    } else {
        getCounter = await prisma.congregationTerritoryCounter.findMany({});
        return NextResponse.json(getCounter,{status:201})
    }
     
    
}

export async function DELETE(request: NextRequest){
    const congregationID = request.nextUrl.searchParams.get("id")
    let getCounter: {} | null=null
    if(congregationID){
        getCounter = await prisma.congregationTerritoryCounter.delete({
            where: {
                congregationID: congregationID,
            }
        })
    }
    return NextResponse.json(getCounter,{status:201})
}