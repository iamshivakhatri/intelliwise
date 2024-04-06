// pages/api/score.js

import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId: string, score: number } = body;

        // Store the score data in the database using Prisma
        const createdScore = await prismadb.user.create({
            data: {
                userId: string,
                score: number
            }
        });

        // Return the created score data in the response
        return new NextResponse(JSON.stringify(createdScore));
    } catch (error) {
        console.error("[POST /api/score]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}


export async function GET() {
    try {
        // Fetch all scores from the database using Prisma
        const allScores = await prismadb.user.findMany();

        // Return the retrieved scores in the response
        return new NextResponse(JSON.stringify(allScores));
    } catch (error) {
        console.error("[GET /api/score]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

// Define the DELETE function
export async function DELETE() {
    try {
        // Delete all scores from the database using Prisma
        await prismadb.user.deleteMany();

        // Return success response
        return new NextResponse("All scores deleted successfully", { status: 200 });
    } catch (error) {
        console.error("[DELETE /api/score]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}


