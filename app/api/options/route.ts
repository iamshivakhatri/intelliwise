import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET() {
    try {
        const options = await prismadb.option.findMany()

        return new NextResponse(JSON.stringify(options));
    } catch (error) {
        console.error("[GET /api/options]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}


export async function DELETE(req: Request) {
    try {
        // Delete all options using Prisma
        const deletedOptions = await prismadb.option.deleteMany();

        console.log("Deleted options:", deletedOptions);

        return new NextResponse(JSON.stringify(deletedOptions));
    } catch (error) {
        console.error("[DELETE /api/options]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}