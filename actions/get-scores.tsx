import prismadb from "@/lib/prismadb";

export const getScores = async (storeId: string) => {
    const scores = await prismadb.question.findMany()
    return scores;
   
}