import { NextApiRequest, NextApiResponse } from "next";
import {z} from "zod";
import prisma from '@/prisma/client';
import type { House } from "@prisma/client";
const createHouseSchema = z.object({
    territoryID: z.string().refine(value =>
        !isNaN(parseInt(value)) && isFinite(parseInt(value)),
        {
            message:"The string is not a valid number"
        }),
    StreetAd: z.string().min(1).max(255),
    dateVisited: z.date().optional(),
    comment: z.string().min(1).max(255).optional(),
    observation: z.enum(["EMPTY","VISITED","DONTVISIT","DOG","NIGHT"]).optional()
});
const updateHouseSchema = z.object({
    territoryID: z.number().positive().finite().optional(),
    StreetAd: z.string().min(1).max(255).optional(),
    dateVisited: z.date().optional(),
    comment: z.string().min(1).max(255).optional(),
    observation: z.enum(["EMPTY","VISITED","DONTVISIT","DOG","NIGHT"]).optional()
    //use zod to check if the isAdmin is true or false "strings"
});
export async function POST(request: NextApiRequest,response: NextApiResponse){
    const body = request.body;
    const validation = createHouseSchema.safeParse(body);
    if (!validation.success){
        return response.status(400).json(validation.error.errors);
    }
    try{
        const newHouse = await prisma.house.create({
            data: {
                houseID: 1,
                territoryID: parseInt(body.territoryID),
                congregationID: body.congregationID,
                StreetAd: body.StreetAd,
                dateVisited: body.dateVisited,
                comment: body.comment,
                observation: body.observation,
            }
        });
        return response.status(201).json(newHouse);
    } catch(e) {
        return response.status(201).json({message:`House POST Transaction failed:\n${e}`});
    }
    
}

export async function GET(request: NextApiRequest,response: NextApiResponse){
    const idParam = Array.isArray(request.query.TerritoryID) ?  request.query.TerritoryID[0] : request.query.TerritoryID;
    const streetAdParam = Array.isArray(request.query.StreetAd) ? request.query.StreetAd[0] : request.query.StreetAd;
    const territoryID = idParam ? parseInt(idParam) : undefined;
    let getHouse: House | House[] | null = null;
    if(territoryID){
        getHouse = await prisma.house.findUnique({
            where: {
                territoryID: territoryID?? undefined,
                StreetAd: streetAdParam?? undefined
            }
        });
    } else {
        getHouse = await prisma.house.findMany({
            where: {
                territoryID: territoryID?? undefined,
            }
        });
    }
    if(!getHouse){
        return response.status(404).json({message: "House record not found"});
    }
    return response.status(201).json(getHouse);
}

export async function PATCH(request: NextApiRequest,response: NextApiResponse){
    const idParam = Array.isArray(request.query.TerritoryID) ? request.query.TerritoryID[0] : request.query.TerritoryID;
    const streetdAdParam = Array.isArray(request.query.StreetAd) ? request.query.StreetAd[0] : request.query.StreetAd;
    const territoryID = idParam ? parseInt(idParam) : undefined;
    const body = request.body;
    const validation = updateHouseSchema.safeParse(body);
    if (!validation.success){
        return response.status(400).json(validation.error.errors);
    }
    const updateData: { [key: string]: any} = {};
    for (const [key,value] of Object.entries(body)){
        if(value!==undefined){
            updateData[key] = value;
        }
    }
    try{
        const updatedHouse = await prisma.house.update({
            where: {
                territoryID: territoryID?? undefined,
                StreetAd: streetdAdParam?? undefined
            },
            data: updateData
        });
        return response.status(201).json(updatedHouse);
    } catch (e){
        return response.status(404).json({message:`House Update Transaction failed:\n ${e}`});
    }
   
}

export async function DELETE(request: NextApiRequest,response: NextApiResponse){
    const idParam = Array.isArray(request.query.TerritoryID) ? request.query.TerritoryID[0] : request.query.TerritoryID;
    const streetdAdParam = Array.isArray(request.query.streetAd) ? request.query.streetAd[0] : request.query.streetAd;
    const territoryID = idParam ? parseInt(idParam) : undefined;
    try{
        const deletedHouse = await prisma.house.delete({
            where: {
                territoryID: territoryID?? undefined,
                StreetAd: streetdAdParam?? undefined
            }
        });
        return response.status(201).json(deletedHouse);
    } catch(e) {
        return response.status(404).json({message: `House DELETE Transaction failed:\n ${e}`});
    }
   
}

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    switch(req.method){
        case 'POST':
            return POST(req,res);
        case 'GET':
            return GET(req,res);
        case 'PATCH':
            return PATCH(req,res);
        case 'DELETE':
            return DELETE(req,res);
    }
}