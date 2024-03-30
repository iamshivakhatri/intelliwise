import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(
req: Request,
{params}:{params:{storeId:string}}
){
    try{
 
        console.log("This is userId", userId);
        const body = await req.json();
        const {label, imageUrl} = body;
        console.log("This is label", label);
   
        if(!label){
            return new NextResponse("Label is required", { status: 400 });

        }
        if(!imageUrl){
            return new NextResponse("ImageUrl  is required", { status: 400 });

        }
        if(!params.storeId){
            return new NextResponse("StoreId  is required", { status: 400 });

        }

        const storeByUserId   = await prismadb.score.findFirst({
            where: {
                id: params.storeId,

            },
        });

        if(!storeByUserId){
            return new NextResponse("Unauthorized", { status: 403 });
        }

       

        const billboard = await prismadb.billboard.create({
            data: {
                label,
                imageUrl,
                storeId: params.storeId
            },
        });
        console.log("This is store", label);

        return new NextResponse(JSON.stringify(billboard));
   

    }catch(error){
        console.log('[STORE_POST]',error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function GET(
    req: Request,
    {params}:{params:{storeId:string}}
    ){
        try{
            
          
    
            const scores = await prismadb.Question.findMany({
                where: {
                   
                    storeId: params.storeId
                },
            });
         
    
            return new NextResponse(JSON.stringify(scores));
       
    
        }catch(error){
            console.log('[SCORE_ERROR]',error);
            return new NextResponse("Internal Server Error", { status: 500 });
        }
    }