import { NextRequest,NextResponse } from "next/server";
import { NextApiRequest } from "next";
import {ZodIssue, z} from "zod"
import prisma from '@/prisma/client'
import { empty } from "@prisma/client/runtime/library";
import type { Territory } from "@prisma/client";
import { ErrorResponse,territoryJSON } from "@/app/types/api";
const createTerritorySchema = z.object({
    location: z.string().min(1).max(255),
    dateLength: z.string().min(1).max(255),
    congregationID: z.string().min(1).max(255),
    currentUserID: z.string().min(1).max(255),
    isAdmin: z.boolean().optional(),
})
const updateTerritorySchema = z.object({
    location: z.string().min(1).max(255).optional(),
    dateLength: z.string().min(1).max(255).optional(),
    congregationID: z.string().min(1).max(255).optional(),
    currentUserID: z.string().min(1).max(255).optional(),
    isAdmin: z.boolean().optional(),
})
export async function POST(request: NextRequest): Promise<NextResponse< territoryJSON | ZodIssue[] | ErrorResponse>>{
    const body = await request.json();
    const validation = createTerritorySchema.safeParse(body);
    const timeUserKeepsTerritory = parseInt(body.dateLength)
    const defaultVal = 1
    const date = new Date()
    if (!validation.success){
        return NextResponse.json(validation.error.errors, {status: 400})
    }
    const endDate = ExperiationDateCalculator(date,timeUserKeepsTerritory)
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
        return NextResponse.json({
            ...newTerritory,
            AssignedDate: date.toISOString(),
            ExperiationDate: endDate.toISOString(),
        },{status: 201}) 
    } catch(e){
        // Log any error that occurs during the database operation
        console.error("Error creating new territory:\n", e);

        // Return an error response
        return NextResponse.json({ message: `Territory POST Transaction failed:\n ${e}`}, {status: 500});
    }
}

export async function GET(request: NextRequest):Promise<NextResponse<Territory | Territory[] | ErrorResponse>>{
    const terrId = request.nextUrl.searchParams.get("terrId")
    const terrIdCheck = terrId ? parseInt(terrId) : undefined
    const congId = request.nextUrl.searchParams.get("congId")
    const congIdCheck = congId ? congId : undefined
    let getTerritory: Territory | Territory[] | null = null
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
            return NextResponse.json({message:"Territory Record not found"})
        }
        return NextResponse.json(getTerritory,{status:201})
    } catch (e){
        return NextResponse.json({ message: `Territory GET Transaction failed:\n ${e}` }, {status: 500});
    }
}

export async function PATCH(request: NextRequest): Promise<NextResponse<Territory | ErrorResponse | ZodIssue[]>>{
    const terrId = request.nextUrl.searchParams.get("terrId")
    const terrIdCheck = terrId ? parseInt(terrId) : undefined
    const congId = request.nextUrl.searchParams.get("congId")
    const congIdCheck = congId ? congId : undefined
    const body = await request.json();
    const validation = updateTerritorySchema.safeParse(body);
    if (!validation.success){
        return NextResponse.json(validation.error.errors, {status: 400})
    }
    const updateData: { [key: string]: any} = {}
    for (const [key,value] of Object.entries(body)){
        if(value!==undefined){
            if(key =="dateLength"){
                const dateLengthStr:string = body.dateLength
                const dateLength = parseInt(dateLengthStr)
                const date = new Date()
                const endDate = ExperiationDateCalculator(date,dateLength)
                updateData["AssignedDate"]= date
                updateData["ExperiationDate"] = endDate
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
                return NextResponse.json({message:"Territory Record was not found"})
            }
            return NextResponse.json(updatedTerritory,{status:201})
        } catch (e){
            console.error("Error creating new territory:\n", e);
            return NextResponse.json({message: `Territory Update Transaction failed:\n ${e}`})
        }
    } else {
        return NextResponse.json({message: "Make sure the parameters are correctly set with the correct types."})
    }


}

export async function DELETE(request: NextRequest): Promise<NextResponse<Territory | ErrorResponse>>{
    const terrId = request.nextUrl.searchParams.get("terrId")
    const terrIdCheck = terrId ? parseInt(terrId) : undefined
    const congId = request.nextUrl.searchParams.get("congId")
    const congIdCheck = congId ? congId : undefined
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
            return NextResponse.json(deletedTerritory,{status:201})
        } catch(e){
        return NextResponse.json({message: "Make sure the parameters are correctly set with the correct types."})
        }
    } else {
        return NextResponse.json({message:"Make sure the parameters are correctly set with the correct types."})
    }
    return NextResponse.json({message:""})
}

function ExperiationDateCalculator( date: Date, daysToAdd: number): Date{
    var result = new Date(date)
    result.setDate(result.getDate()+daysToAdd)
    return result
}

