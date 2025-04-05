import { executeQuery } from "@/lib/db";

export async function GET(req) { // ✅ Named export for POST
  try {
    const spQuery = `
      EXEC dbo.pubdocumenthandling 103,NULL,132,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'',NULL
    `;
    const result = await executeQuery(spQuery);
    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error("Error executing stored procedure:", error);
    return Response.json({ message: "Internal server error", error }, { status: 500 });
  }
}
