import { NextRequest,NextResponse } from "next/server";
import { NextApiRequest } from "next";
import {z} from "zod"
import prisma from '@/prisma/client'
const createCongregationSchema = z.object({
    congregationName: z.string().min(1).max(255),
    address: z.string().min(1).max(255)
})

export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = createCongregationSchema.safeParse(body);
    if (!validation.success){
        return NextResponse.json(validation.error.errors, {status: 400})
    }
    const newCongregation = await prisma.congregation.create({
        data: {
            congregationName:body.congregationName, 
            address: body.address
        }
    }
    )
    return NextResponse.json(newCongregation,{status: 201})
}

export async function GET(request: NextRequest){
    const allCongregations = await prisma.congregation.findMany();
    return NextResponse.json(allCongregations,{status:201})
}
export async function UPDATE(request: NextRequest){
    const allCongregations = await prisma.congregation.update({
        where: {
            id: '123'
        },
        data: {
            congregationName: 'NewName',
            address: 'NewAddress',
        }
    });
    return NextResponse.json(allCongregations,{status:201})
}

// export async function DELETE(request: NextRequest){
//     const body = await request.json();
//     const validation = createCongregationSchema.safeParse(body);
//     if (!validation.success){
//         return NextResponse.json(validation.error.errors, {status: 400})
//     }
//     console.log(body)
//     const deletedCongregation = await prisma.congregation.delete({
//         where: {
//             congregationName:body.address
//         }
//         }
//     )

//     return NextResponse.json(newCongregation,{status: 201})
// }