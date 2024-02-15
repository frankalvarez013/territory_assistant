import { NextRequest,NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import {ZodIssue, z} from "zod"
import prisma from '@/prisma/client'
import { ErrorResponse } from "@/app/types/api";
import type { Congregation } from "@prisma/client";
 
const createCongregationSchema = z.object({
    congregationName: z.string().min(1).max(255),
    address: z.string().min(1).max(255)
})
const updateCongregationSchema = z.object({
    congregationName: z.string().min(1).max(255).optional(),
    address: z.string().min(1).max(255).optional()
})

export async function POST(request: NextApiRequest,res:NextApiResponse){
    const body:Congregation = request.body;
    const validation = createCongregationSchema.safeParse(body);
    if (!validation.success){
        return res.status(400).json(validation.error.errors)
    }
    try{
        const newCongregation = await prisma.congregation.create({
            data: {
                congregationName:body.congregationName, 
                address: body.address
            }
        }
        )
        return res.status(201).json(newCongregation)
    } catch (e){
        return res.status(404).json({ message: `Congregation POST Transaction failed:\n ${e}` });
    }
   
}

export async function GET(request: NextApiRequest, res:NextApiResponse){
    const id = Array.isArray(request.query.id) ? request.query.id[0] : request.query.id;
    let getCongregation: Congregation | Congregation[] | null = null;
    if (id){
        console.log("inside with idParam",id);
        try{
            getCongregation = await prisma.congregation.findUnique({
                where: {
                    id:id
                }
            });
        }catch (e){
            console.log(e);
            return res.status(404).json({ message: `Congregation GET Transaction failed:\n ${e}` });
        }
        
    } else {
        getCongregation = await prisma.congregation.findMany({});
    }
    if(!getCongregation){
        console.log("Congregation Record not Found:\n",getCongregation);
        return res.status(404).json({ message: `Congregation Record not found:` });
    }
    return res.status(200).json(getCongregation);
}

export async function PATCH(request: NextApiRequest,res:NextApiResponse){
    const body:Congregation = request.body
    const id = Array.isArray(request.query.id) ? request.query.id[0] : request.query.id;
    const validation = updateCongregationSchema.safeParse(body);
    if (!validation.success){
        return res.status(400).json(validation.error.errors)
    }
    const updateData : {[key: string]:string} = {}
    for (const [key,value] of Object.entries(body)){
        if(value!=undefined){
            updateData[key] = value
        }
    }
    try{
        const updateCongregation = await prisma.congregation.update({
            where: {
                id: id
            },
            data: updateData
        });
        return res.status(201).json(updateCongregation);
    } catch (e){
        return res.status(404).json({ message: `Congregation GET Transaction failed:\n ${e}` });
    }
  
}

export async function DELETE(request: NextApiRequest,res:NextApiResponse){
    const id = Array.isArray(request.query.id) ? request.query.id[0] : request.query.id;
    try{
        const deletedCongregation = await prisma.congregation.delete({
            where: {
                id: id
            }
        });
        return res.status(201).json(deletedCongregation)
    } catch (e){
        return res.status(404).json({ message: `Congregation DELETE Transaction failed:\n ${e}` });
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