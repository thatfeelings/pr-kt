import { executeQuery } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        const dtsserialdfs = searchParams.get("dtsserialdfs");
        const xxxserialdfs = searchParams.get("xxxserialdfs");
        const docstatus = searchParams.get("docstatus");
        
        // Validate required parameters
        if (!dtsserialdfs || !xxxserialdfs || !docstatus) {
            return NextResponse.json(
                { message: "Missing required parameters" },
                { status: 400 }
            );
        }

        // Construct SQL query and parameters
        const spQuery = `EXEC dbo.pubdocumentmainview @DTSSerialDFS, @XXXSerialDFS, @DocStatus`;
        const params = {
            DTSSerialDFS: dtsserialdfs,
            XXXSerialDFS: xxxserialdfs,
            DocStatus: docstatus,
        };

        const result = await executeQuery(spQuery, params);

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error executing stored procedure:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
