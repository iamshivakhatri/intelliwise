import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        console.log("Request Body:", body); // Debugging

        // Validate incoming request body
        if (!Array.isArray(body)) {
            return new NextResponse("Invalid request body format. Expected an array.", { status: 400 });
        }
        await prismadb.option.deleteMany(); // Delete all existing options
        await prismadb.question.deleteMany(); // Delete all existing questions
        

        // Create an array to store all created questions
        const createdQuestions = [];

        for (const questionData of body) {
            // Destructure question data
            const { id, question, answer, options } = questionData;

            // Validate question data
            if (!id || !question || !answer || !options || !Array.isArray(options)) {
                console.error("Invalid question data:", questionData);
                continue; // Skip this iteration and move to the next one
            }

            // Check if the question with the given ID already exists
            const existingQuestion = await prismadb.question.findUnique({
                where: { id }
            });

            if (existingQuestion) {
                console.error(`Question with ID ${id} already exists.`);
                continue; // Skip this iteration and move to the next one
            }

            // Create question using Prisma
            const createdQuestion = await prismadb.question.create({
                data: {
                    id,
                    question,
                    answer,
                    options: {
                        createMany: {
                            data: options.map((option: string) => ({ value: option }))
                        }
                    }
                },
                include: {
                    options: true
                }
            });

            console.log("Created question:", createdQuestion);
            createdQuestions.push(createdQuestion);
        }

        return new NextResponse(JSON.stringify(createdQuestions));
    } catch (error) {
        console.error("[POST /api/questions]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function GET() {
    try {
        const questions = await prismadb.question.findMany();

        return new NextResponse(JSON.stringify(questions));
    } catch (error) {
        console.error("[GET /api/questions]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}


export async function DELETE(req: Request) {
    try {
        // Delete all questions using Prisma
        const deletedQuestions = await prismadb.question.deleteMany();

        console.log("Deleted questions:", deletedQuestions);

        return new NextResponse(JSON.stringify(deletedQuestions));
    } catch (error) {
        console.error("[DELETE /api/questions]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
