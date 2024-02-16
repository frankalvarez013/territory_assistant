import { NextApiRequest, NextApiResponse } from "next";
import {z} from "zod";
import prisma from '@/prisma/client';
import type { Territory } from "@prisma/client";
const createTerritorySchema = z.object({
    location: z.string().min(1).max(255),
    dateLength: z.string().min(1).max(255),
    congregationID: z.string().min(1).max(255),
    currentUserID: z.string().min(1).max(255),
    isAdmin: z.boolean().optional(),
});
const updateTerritorySchema = z.object({
    location: z.string().min(1).max(255).optional(),
    dateLength: z.string().min(1).max(255).optional(),
    congregationID: z.string().min(1).max(255).optional(),
    currentUserID: z.string().min(1).max(255).optional(),
    isAdmin: z.boolean().optional(),
});
export async function POST(request: NextApiRequest,response:NextApiResponse){
    const body = request.body;
    const validation = createTerritorySchema.safeParse(body);
    const timeUserKeepsTerritory = parseInt(body.dateLength);
    const defaultVal = 1;
    const date = new Date();
    if (!validation.success){
        return response.status(400).json(validation.error.errors);
    }
    const endDate = ExperiationDateCalculator(date,timeUserKeepsTerritory);
    try{
        const newTerritory = await prisma.territory.create({
            data: {
                territoryID: defaultVal,
                location: body.location,
                AssignedDate: date,
                ExperiationDate: endDate,
                congregationID: body.congregationID,
                currentUserID: body.currentUserID,
            }
        }
        )
        return response.status(201).json({...newTerritory, AssignedDate: date.toISOString(), ExperiationDate: endDate.toISOString()});
    } catch(e){
        // Log any error that occurs during the database operation
        console.error("Error creating new territory:\n", e);
        // Return an error response
        return response.status(500).json({ message: `Territory POST Transaction failed:\n ${e}`});
    }
}

export async function GET(request: NextApiRequest,response:NextApiResponse){
    const terrId = Array.isArray(request.query.TerritoryID) ? request.query.TerritoryID[0] : request.query.TerritoryID;
    const terrIdCheck = terrId ? parseInt(terrId) : undefined;
    const congId = Array.isArray(request.query.congId) ? request.query.congId[0] : request.query.congId;
    const congIdCheck = congId ? congId : undefined;
    let getTerritory: Territory | Territory[] | null = null;
    try{
        if(typeof(terrIdCheck) === 'number' && congIdCheck){
            getTerritory = await prisma.territory.findUnique({
                where: {
                    territoryID_congregationID:{
                        territoryID: terrIdCheck,
                        congregationID: congIdCheck
                    }
                }
            });
        } else {
            getTerritory = await prisma.territory.findMany({});
        }
        if(!getTerritory){
            return response.status(404).json({message:"Territory Record not found"});
        }
        return response.status(201).json(getTerritory);
    } catch (e){
        return response.status(500).json({message: `Territory GET Transaction failed:\n ${e}`});
    }
}

export async function PATCH(request: NextApiRequest,response:NextApiResponse){
    const terrId = Array.isArray(request.query.TerritoryID) ? request.query.TerritoryID[0] : request.query.TerritoryID;
    const terrIdCheck = terrId ? parseInt(terrId) : undefined;
    const congId = Array.isArray(request.query.congId) ? request.query.congId[0] : request.query.congId;
    const congIdCheck = congId ? congId : undefined;
    const body = request.body;
    const validation = updateTerritorySchema.safeParse(body);
    if (!validation.success){
        return  response.status(400).json(validation.error.errors);
    }
    const updateData: { [key: string]: any} = {};
    for (const [key,value] of Object.entries(body)){
        if(value!==undefined){
            if(key =="dateLength"){
                const dateLengthStr:string = body.dateLength;
                const dateLength = parseInt(dateLengthStr);
                const date = new Date();
                const endDate = ExperiationDateCalculator(date,dateLength);
                updateData["AssignedDate"]= date;
                updateData["ExperiationDate"] = endDate;
            } else {
                updateData[key] = value;
            }
        }
    }
    if (terrIdCheck && congIdCheck){
        try{
            const updatedTerritory = await prisma.territory.update({
                where: {
                    territoryID_congregationID:{
                        territoryID: terrIdCheck,
                        congregationID: congIdCheck.toString()
                    }
                },
                data: updateData
            });
            if (!updatedTerritory){
                return response.status(404).json({message:"Territory Record not found"});
            }
            return response.status(201).json(updatedTerritory);
        } catch (e){
            console.error("Error creating new territory:\n", e);
            return response.status(500).json({message: `Territory Update Transaction failed:\n ${e}`});
        }
    } else {
        return response.status(500).json({message: "Make sure the parameters are correctly set with the correct types."});
    }


}

export async function DELETE(request: NextApiRequest,response:NextApiResponse){
    const terrId = Array.isArray(request.query.TerritoryID) ? request.query.TerritoryID[0] : request.query.TerritoryID;
    const terrIdCheck = terrId ? parseInt(terrId) : undefined;
    const congId = Array.isArray(request.query.congId) ? request.query.congId[0] : request.query.congId;
    const congIdCheck = congId ? congId : undefined;
    if(typeof(terrIdCheck)===typeof(0) && congIdCheck && terrIdCheck !=null){
        try{
            const deletedTerritory = await prisma.territory.delete({
                where: {
                    territoryID_congregationID:{
                        territoryID: terrIdCheck,
                        congregationID: congIdCheck
                    }
                }
            });
            return response.status(201).json(deletedTerritory);
        } catch(e){
        return response.status(500).json({message: "Make sure the parameters are correctly set with the correct types."});
        }
    } else {
        return response.status(500).json({message:"Make sure the parameters are correctly set with the correct types."});
    }
}

function ExperiationDateCalculator( date: Date, daysToAdd: number): Date{
    var result = new Date(date);
    result.setDate(result.getDate()+daysToAdd);
    return result;
}

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    switch(req.method){
        case 'POST':
            POST(req,res);
        case 'GET':
            GET(req,res);
        case 'PATCH':
            PATCH(req,res);
        case 'DELETE':
            DELETE(req,res);
    }
}