import { executeQuery } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const query = "SELECT * FROM pubusers";
  const result = await executeQuery(query);
  return NextResponse.json(result);
}