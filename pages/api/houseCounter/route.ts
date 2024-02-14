import { NextRequest,NextResponse } from "next/server";
import { NextApiRequest } from "next";
import {z} from "zod"
import prisma from '@/prisma/client'
import type { HouseCounter } from "@prisma/client";
import { ErrorResponse } from "@/app/types/api";
export async function GET(request: NextRequest):Promise<NextResponse<HouseCounter | HouseCounter[] | ErrorResponse>>{
    const territoryID = request.nextUrl.searchParams.get("terrId")
    const congregationID = request.nextUrl.searchParams.get("congId")
    const territoryIDCheck = territoryID ? parseInt(territoryID) : undefined
    let getCounter: HouseCounter | HouseCounter[] | null = null
    try{
        if(territoryIDCheck && congregationID){
            getCounter = await prisma.houseCounter.findUnique({
                where: {
                    territoryID_congregationID:{
                        territoryID: territoryIDCheck,
                        congregationID: congregationID
                    }
                }
            });
        } else {
            getCounter = await prisma.houseCounter.findMany({});
        }
        if (!getCounter){
            return NextResponse.json({message: "Congregation Record not found"}, {status: 404})
        }
        return NextResponse.json(getCounter,{status:201})
    } catch(e) {
        return NextResponse.json({message: `houseCounter GET Transaction failed:\n ${e}`}, {status: 404})
    }
   

}

export async function DELETE(request: NextRequest):Promise<NextResponse<HouseCounter | ErrorResponse>>{
    const territoryID = request.nextUrl.searchParams.get("terrId")
    const congregationID = request.nextUrl.searchParams.get("congId")
    const territoryIDCheck = territoryID ? parseInt(territoryID) : undefined
    let getCounter: HouseCounter | null= null
    if(territoryIDCheck && congregationID){
        try{
            getCounter = await prisma.houseCounter.delete({
                where: {
                    territoryID_congregationID:{
                        territoryID: territoryIDCheck,
                        congregationID: congregationID
                    }
                }
            })
        } catch(e) {
            return NextResponse.json({message: `houseCounter Delete Transaction failed:\n ${e}`}, {status: 404})
        }
        
    }
    if(!getCounter){
        return NextResponse.json({message:"Congregation Record not found"}, {status: 404})
    }
    return NextResponse.json(getCounter,{status:201})
}