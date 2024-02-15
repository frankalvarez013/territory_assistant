import {ZodIssue, z} from "zod";
import prisma from '@/prisma/client';
import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const createUserSchema = z.object({
    fName: z.string().min(1).max(255),
    lName: z.string().min(1).max(255),
    email: z.string().min(1).max(255),
    congregationID: z.string().min(1).max(255),
    //use zode to check if the isAdmin is true or false "strings"
});
const updateUserSchema = z.object({
    fName: z.string().min(1).max(255).optional(),
    lName: z.string().min(1).max(255).optional(),
    email: z.string().min(1).max(255).optional(),
    congregationID: z.string().min(1).max(255).optional(),
    //use zod to check if the isAdmin is true or false "strings"
});
export async function POST(request:NextApiRequest,response:NextApiResponse){
    const body = await request.body;
    const validation = createUserSchema.safeParse(body);
    let isAdmin = false;
    if (!validation.success){
        return response.status(400).json(validation.error.errors);
    }
    if(String(body.isAdmin).toLowerCase() === "true"){
        isAdmin = true;
    }
    try{
        const newUser = await prisma.user.create({
            data: {
                fName: body.fName,
                lName: body.lName,
                email: body.email,
                password: body.password,
                congregationID: body.congregationID,
                isAdmin: isAdmin
            }
        });
        return response.status(201).json(newUser);
    } catch(e) {
        return response.status(500).json({message:`User POST failed:\n ${e}`});
    }
}

export async function GET(request:NextApiRequest,response:NextApiResponse){
    const userId = Array.isArray(request.query.userId) ? request.query.userId[0] : request.query.userId;
    let getUser: User | User[] | null = null;
    try{
        if (userId){
            getUser = await prisma.user.findUnique({
                where: {
                    id: userId
                }
            });
        } else {
            getUser = await prisma.user.findMany({});
        }
        if(!getUser){
            return response.status(500).json({message:"User Record not found"});
        }
        return response.status(201).json(getUser);
    } catch(e){
        return response.status(500).json({message:`USER GET transaction failed:\n ${e}`});
    }
}

export async function PATCH(request:NextApiRequest,response:NextApiResponse){
    const userId = Array.isArray(request.query.userId) ? request.query.userId[0] : request.query.userId;
    const body = await request.body;
    const validation = updateUserSchema.safeParse(body);
    let isAdmin = false;
    if(String(body.isAdmin).toLowerCase() === "true"){
        isAdmin = true;
    }
    if (!validation.success){
        return response.status(400).json(validation.error.errors);
    }
    const updateData: { [key: string]: any} = {}
    for (const [key,value] of Object.entries(body)){
        if(value!==undefined){
            if(key === "isAdmin"){
                let isAdmin = false;
                if(String(value).toLowerCase() === "true"){
                    isAdmin = true;
                }
                updateData[key] = isAdmin;
            } else {
                updateData[key] = value;
            }
        }
    }
    try{
        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: updateData
        });
        return response.status(201).json(updatedUser);

    } catch (e) {
        return response.status(500).json({message:`USER UPDATE transaction failed:\n ${e}`});
    }
  
}

export async function DELETE(request:NextApiRequest,response:NextApiResponse){
    const userId = Array.isArray(request.query.userId) ? request.query.userId[0] : request.query.userId;
    try{
        const deletedUser = await prisma.user.delete({
            where: {
                id: userId
            }
        });
        return response.status(201).json(deletedUser);
    } catch(e){
        return response.status(500).json({message:`USER DELETE transaction failed:\n ${e}`});
    }
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