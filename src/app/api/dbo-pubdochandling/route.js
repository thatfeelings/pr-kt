import { executeQuery } from "@/lib/db";
// import { User } from "@phosphor-icons/react";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");


    if (!userId) {
      return NextResponse.json({ message: "Unauthorized: Missing User ID" }, { status: 401 });
    }

    // ✅ Execute stored procedure with dynamic user ID
    const spQuery = `EXEC dbo.pubdocumenthandling 103,NULL,@USER,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'',NULL`;
    const params = { USER: userId };

    const result = await executeQuery(spQuery, params);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error executing stored procedure:", error);
    return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
  }
}
