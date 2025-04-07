import { executeQuery } from "@/lib/db";
// import { NextResponse } from "next/server";

export async function GET (request) {
    try {
        const { searchParams } = new URL(request.url);
        const codedts = searchParams.get("codedts");
        const query = `
            SELECT Tab1DTS, Tab2DTS, Tab3DTS, Tab4DTS, Tab5DTS, Tab6DTS, Tab7DTS , Tab8DTS
            FROM PubDocumenttype
            WHERE codedts = @codedtsvalue
        `;
        const params = { codedtsvalue : codedts };
        const result = await executeQuery(query, params);

        const filteredTabs = Object.entries(result[0] || {}).reduce((acc, [key, value]) => {
            if (value !== null) acc[key] = value;
            return acc;
        }, {});

        return new Response(JSON.stringify(filteredTabs), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Failed to fetch data', error);
        return new Response(JSON.stringify({ message: 'Internal server error', error }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
