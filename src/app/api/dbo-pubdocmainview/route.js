import { executeQuery } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ message: "Unauthorized: Missing User ID" }, { status: 401 });
        }

        const spQuery = `EXEC dbo.pubdocumentmainview  @DTSSerialDFS, @XXXSerialDFS int=null, @DocStatus `;
        const params = { USER: userId };

        const result = await executeQuery(spQuery, params);
        
        if (!result || result.length === 0) {
            return NextResponse.json({ message: "No data found" }, { status: 404 });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error executing stored procedure:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
