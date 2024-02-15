import { NextRequest,NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import {z} from "zod"
import prisma from '@/prisma/client'
import type { HouseCounter } from "@prisma/client";
import { ErrorResponse } from "@/app/types/api";
export async function GET(request: NextApiRequest,response:NextApiResponse){
    const territoryID = Array.isArray(request.query.TerritoryID) ? request.query.TerritoryID[0] : request.query.TerritoryID;
    const congregationID = Array.isArray(request.query.congId) ? request.query.congId[0] : request.query.congId;
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
            return response.status(404).json({message: "Congregation Record not found"})
        }
        return response.status(201).json(getCounter)
    } catch(e) {
        return response.status(404).json({message: `houseCounter GET Transaction failed:\n ${e}`})
    }
   

}

export async function DELETE(request: NextApiRequest,response:NextApiResponse){
    const territoryID = Array.isArray(request.query.TerritoryID) ? request.query.TerritoryID[0] : request.query.TerritoryID;
    const congregationID = Array.isArray(request.query.congId) ? request.query.congId[0] : request.query.congId;
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
            return response.status(404).json({message: `houseCounter Delete Transaction failed:\n ${e}`})
        }
        
    }
    if(!getCounter){
        return response.status(404).json({message:"Congregation Record not found"})
    }
    return response.status(201).json(getCounter)

}

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    switch(req.method){
        case 'GET':
            GET(req,res);
        case 'DELETE':
            DELETE(req,res);
    }
}