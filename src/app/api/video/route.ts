import {NextResponse, NextRequest} from "next/server"
import {PrismaClient} from "@prisma/client"

//PrismaClient used for Query
const prisma = new PrismaClient()

export async function  GET(request:NextRequest){
    try{
    const videos= await prisma.video.findMany({
            orderBy:{
                createdAt: "desc"
            }
        })
        return NextResponse.json(videos)
    }
    catch(error:any){
        return NextResponse.json({message: error.message},
            {status:500}
        )
    }
}