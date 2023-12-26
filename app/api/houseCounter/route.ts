import { NextRequest,NextResponse } from "next/server";
import { NextApiRequest } from "next";
import {z} from "zod"
import prisma from '@/prisma/client'
import type { HouseCounter } from "@prisma/client";
import { ErrorResponse } from "@/app/types/api";
export async function GET(request: NextRequest):Promise<NextResponse<HouseCounter | HouseCounter[] | ErrorResponse>>{
    const territoryID = request.nextUrl.searchParams.get("id")
    const territoryIDCheck = territoryID ? parseInt(territoryID) : undefined
    let getCounter: HouseCounter | HouseCounter[] | null = null
    try{
        if(territoryIDCheck){
            getCounter = await prisma.houseCounter.findUnique({
                where: {
                    territoryID: territoryIDCheck,
                }
            });
        } else {
            getCounter = await prisma.houseCounter.findMany({});
        }
        if (!getCounter){
            return NextResponse.json({message: "Congregation not found"}, {status: 404})
        }
        return NextResponse.json(getCounter,{status:201})
    } catch {
        return NextResponse.json({message: "Congregation not found"}, {status: 404})
    }
   

}

export async function DELETE(request: NextRequest):Promise<NextResponse<HouseCounter | ErrorResponse>>{
    const territoryID = request.nextUrl.searchParams.get("id")
    const territoryCheck = territoryID ? parseInt(territoryID) : undefined
    let getCounter: HouseCounter | null=null
    if(territoryCheck){
        try{
            getCounter = await prisma.houseCounter.delete({
                where: {
                    territoryID: territoryCheck,
                }
            })
        } catch {
            return NextResponse.json({message: "Congregation not found"}, {status: 404})
        }
        
    }
    if(!getCounter){
        return NextResponse.json({message:"Congregation not found"}, {status: 404})
    }
    return NextResponse.json(getCounter,{status:201})
}