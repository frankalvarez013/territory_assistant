import { NextRequest,NextResponse } from "next/server";
import { NextApiRequest } from "next";
import {z} from "zod"
import prisma from '@/prisma/client'
import type { CongregationTerritoryCounter } from "@prisma/client";
import { ErrorResponse } from "@/app/types/api";
export async function GET(request: NextRequest): Promise<NextResponse<CongregationTerritoryCounter | CongregationTerritoryCounter[] | ErrorResponse>>{
    const congregationID = request.nextUrl.searchParams.get("id")
    let getCounter: CongregationTerritoryCounter | CongregationTerritoryCounter[] | null = null
    if(congregationID){
        try{
            getCounter = await prisma.congregationTerritoryCounter.findUnique({
                where: {
                    congregationID: congregationID,
                }
            });
        } catch(e) {
            return NextResponse.json({message: `Congregation not found ${e}`}, {status: 404})
        }
        
    } else {
        getCounter = await prisma.congregationTerritoryCounter.findMany({});
    }
    if (!getCounter){
        return NextResponse.json({message: "Congregation not found"}, {status: 404})
    }
    return NextResponse.json(getCounter,{status:201})
}

export async function DELETE(request: NextRequest):Promise<NextResponse<CongregationTerritoryCounter | ErrorResponse>>{
    const congregationID = request.nextUrl.searchParams.get("id")
    let getCounter: CongregationTerritoryCounter| null = null
    if(congregationID){
        try{
            getCounter = await prisma.congregationTerritoryCounter.delete({
                where: {
                    congregationID: congregationID,
                }
            })
        }catch(e) {
            return NextResponse.json({message: `Congregation not found ${e}`}, {status: 404})
        }
        
    }
    if (!getCounter){
        return NextResponse.json({message: "Congregation not found"}, {status: 404})
    }
    return NextResponse.json(getCounter,{status:201})
}