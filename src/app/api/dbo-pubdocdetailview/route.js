import { executeQuery } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const dtsserialdfs = searchParams.get("dtsSerialDfs");
        const xxxserialdfs = searchParams.get("xxxSerialDfs");
        const docstatus = searchParams.get("docStatus");
        console.log("dtsserialdfs", dtsserialdfs);
        
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
