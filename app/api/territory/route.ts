import { NextRequest,NextResponse } from "next/server";
import { NextApiRequest } from "next";
import {ZodIssue, z} from "zod"
import prisma from '@/prisma/client'
import { empty } from "@prisma/client/runtime/library";
import type { Territory } from "@prisma/client";
import { ErrorResponse,territoryJSON } from "@/app/types/api";
const createTerritorySchema = z.object({
    location: z.string().min(1).max(255),
    // dateLength: z.string().min(1).max(255),
    congregationID: z.string().min(1).max(255),
    currentUserID: z.string().min(1).max(255)
})
const updateTerritorySchema = z.object({
    location: z.string().min(1).max(255).optional(),
    // dateLength: z.string().min(1).max(255).optional(),
    congregationID: z.string().min(1).max(255).optional(),
    currentUserID: z.string().min(1).max(255).optional(),
    //use zod to check if the isAdmin is true or false "strings"
})
export async function POST(request: NextRequest): Promise<NextResponse< territoryJSON | ZodIssue[] | ErrorResponse>>{
    const body = await request.json();
    const validation = createTerritorySchema.safeParse(body);
    // const idParam = request.nextUrl.searchParams.get("dateLength")
    // const timeUserKeepsTerritory = idParam ? parseInt(idParam) : undefined
    // const timeUserKeepsTerritory = parseInt(body.dateLength)
    const timeUserKeepsTerritory = 182
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
    } catch(error){
        // Log any error that occurs during the database operation
        console.error("Error creating new territory:", error);

        // Return an error response
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500});
    }
}

export async function GET(request: NextRequest):Promise<NextResponse<Territory | Territory[] | ErrorResponse>>{
    const terrId = request.nextUrl.searchParams.get("terrId")
    const terrIdCheck = terrId ? parseInt(terrId) : undefined
    const congId = request.nextUrl.searchParams.get("congId")
    const congIdCheck = congId ? congId : undefined
    let getTerritory: Territory | Territory[] | null = null
    try{
        if(typeof(terrIdCheck) === 'number' && typeof(congIdCheck) ==='number'){
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
            return NextResponse.json({message:"Could Not Find Territory"})
        }
        return NextResponse.json(getTerritory,{status:201})
    } catch (e){
        return NextResponse.json({ message: "Could Not Find Territory" }, {status: 500});
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
            updateData[key] = value;
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
                if (updatedTerritory){
                    return NextResponse.json({message:"Record was not found"})
                }
                return NextResponse.json(updatedTerritory,{status:201})
            } catch (e){
                return NextResponse.json({message: "Make sure the parameters are correctly set with the correct types."})
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
                        congregationID: congIdCheck.toString()
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
    // if(typeof(terrIdCheck)===typeof(0) && congIdCheck && terrIdCheck !=null){
    //     const emptyTerr = await prisma.territory.update({
    //         where: {
    //             territoryID_congregationID:{
    //                 territoryID: terrIdCheck,
    //                 congregationID: congIdCheck.toString()
    //             }
    //         },
    //         data: {
    //             AssignedDate: null,
    //             ExperiationDate: null,
    //             currentUserID: null,
    //         }
    //     })
    //     return NextResponse.json(emptyTerr, {status:201})
    // }
}

function ExperiationDateCalculator( date: Date, daysToAdd: number): Date{
    var result = new Date(date)
    result.setDate(result.getDate()+daysToAdd)
    return result
}