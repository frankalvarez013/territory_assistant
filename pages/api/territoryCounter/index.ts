import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/prisma/client';
import type { TerritoryCounter } from "@prisma/client";
export async function GET(request:NextApiRequest, response:NextApiResponse){
    const congregationID = Array.isArray(request.query.congId) ? request.query.congId[0] : request.query.congId;
    let getCounter: TerritoryCounter | TerritoryCounter[] | null;
    if(congregationID){
        try{
            getCounter = await prisma.territoryCounter.findMany({
                where: {
                    congregationID: congregationID,
                }
            });
        } catch(e) {
            return response.status(404).json({message: `territoryCounter GET Transaction failed:\n ${e}`});
        }
    } else {
        getCounter = await prisma.territoryCounter.findMany({});
    }
    if (!getCounter){
        return response.status(404).json({message: "TerritoryCounter Record not found"});
    }
    return response.status(201).json(getCounter);
}

export async function DELETE(request:NextApiRequest, response:NextApiResponse){
    const congregationID = Array.isArray(request.query.congId) ? request.query.congId[0] : request.query.congId;
    let getCounter: TerritoryCounter | null = null;
    if(congregationID){
        try{
            getCounter = await prisma.territoryCounter.delete({
                where: {
                    congregationID: congregationID,
                }
            })
        }catch(e) {
            return response.status(404).json({message: `territoryCounter DELETE Transaction failed:\n ${e}`});
        }
        
    }
    if (!getCounter){
        return response.status(404).json({message: "TerritoryCounter Record not found"});
    }
    return response.status(201).json(getCounter);
}

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    switch(req.method){
        case 'GET':
            return GET(req,res);
        case 'DELETE':
            return DELETE(req,res);
    }
}