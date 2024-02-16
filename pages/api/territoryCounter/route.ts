import { NextRequest,NextResponse } from "next/server";
import { NextApiRequest } from "next";
import {z} from "zod"
import prisma from '@/prisma/client'
import type { TerritoryCounter } from "@prisma/client";
import { ErrorResponse } from "@/app/types/api";
export async function GET(request: NextRequest): Promise<NextResponse<TerritoryCounter | TerritoryCounter[] | ErrorResponse>>{
    const congregationID = request.nextUrl.searchParams.get("id")
    let getCounter: TerritoryCounter | TerritoryCounter[] | null
    if(congregationID){
        try{
            getCounter = await prisma.territoryCounter.findMany({
                where: {
                    congregationID: congregationID,
                }
            });
        } catch(e) {
            return NextResponse.json({message: `territoryCounter GET Transaction failed:\n ${e}`}, {status: 404})
        }
        
    } else {
        getCounter = await prisma.territoryCounter.findMany({});
    }
    if (!getCounter){
        return NextResponse.json({message: "TerritoryCounter Record not found"}, {status: 404})
    }
    return NextResponse.json(getCounter,{status:201})
}

export async function DELETE(request: NextRequest):Promise<NextResponse<TerritoryCounter | ErrorResponse>>{
    const congregationID = request.nextUrl.searchParams.get("id")
    let getCounter: TerritoryCounter | null = null
    if(congregationID){
        try{
            getCounter = await prisma.territoryCounter.delete({
                where: {
                    congregationID: congregationID,
                }
            })
        }catch(e) {
            return NextResponse.json({message: `territoryCounter DELETE Transaction failed:\n ${e}`}, {status: 404})
        }
        
    }
    if (!getCounter){
        return NextResponse.json({message: "TerritoryCounter Record not found"}, {status: 404})
    }
    return NextResponse.json(getCounter,{status:201})
}