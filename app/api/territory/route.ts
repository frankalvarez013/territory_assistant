import { NextRequest,NextResponse } from "next/server";
import { NextApiRequest } from "next";
import {z} from "zod"
import prisma from '@/prisma/client'

const createTerritorySchema = z.object({
    location: z.string().min(1).max(255),
    dateLength: z.string().min(1).max(255),
    congregationID: z.string().min(1).max(255),
    currentUserID: z.string().min(1).max(255)
})

export async function POST(request: NextRequest){
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

export async function GET(request: NextRequest){
    const terrId = request.nextUrl.searchParams.get("terrId")
    const terrIdCheck = terrId ? parseInt(terrId) : undefined
    const congId = request.nextUrl.searchParams.get("congId")
    const congIdCheck = congId ? congId : undefined
    let getTerritory: {} | null = null
    console.log(terrIdCheck,congIdCheck)
    if(typeof(terrIdCheck) === 'number' && typeof(congIdCheck) ==='number'){
        getTerritory = await prisma.territory.findUnique({
            where: {
                territoryID_congregationID:{
                    territoryID: terrIdCheck,
                    congregationID: congIdCheck
                }
            }
        });
        return NextResponse.json(getTerritory,{status:201})
    } else {
        getTerritory = await prisma.territory.findMany({});
        return NextResponse.json(getTerritory,{status:201})
    }
}

export async function UPDATE(request: NextRequest){
    const terrId = request.nextUrl.searchParams.get("terrId")
    const terrIdCheck = terrId ? parseInt(terrId) : undefined
    const congId = request.nextUrl.searchParams.get("congId")
    const congIdCheck = congId ? congId : undefined
    const body = await request.json();
    const validation = createTerritorySchema.safeParse(body);
    if (!validation.success){
        return NextResponse.json(validation.error.errors, {status: 400})
    }
    if (terrIdCheck && congIdCheck){
        const updatedTerritory = await prisma.territory.update({
            where: {
                territoryID_congregationID:{
                    territoryID: terrIdCheck,
                    congregationID: congIdCheck.toString()
                }
            },
            data: {
                territoryID: body.territoryID,
                location: body.location,
                AssignedDate: body.AssignedDate,
                ExperiationDate: body.ExperiationDate,
                congregationID: body.congregationID,
                currentUserID: body.currentUserID,
            }
        });
        return NextResponse.json(updatedTerritory,{status:201})
    }
}

export async function DELETE(request: NextRequest){
    const terrId = request.nextUrl.searchParams.get("terrId")
    const terrIdCheck = terrId ? parseInt(terrId) : undefined
    const congId = request.nextUrl.searchParams.get("congId")
    const congIdCheck = congId ? congId : undefined
    console.log(terrId,congIdCheck)
    if(typeof(terrIdCheck)===typeof(0) && congIdCheck && terrIdCheck !=null){
        const deletedTerritory = await prisma.territory.delete({
            where: {
                territoryID_congregationID:{
                    territoryID: terrIdCheck,
                    congregationID: congIdCheck.toString()
                }
            }
        });
        console.log(deletedTerritory)
        return NextResponse.json(deletedTerritory,{status:201})
    }
}

function ExperiationDateCalculator( date: Date, daysToAdd: number): Date{
    var result = new Date(date)
    result.setDate(result.getDate()+daysToAdd)
    return result
}