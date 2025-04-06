import { executeQuery } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // const { username, password } = await req.json();

    // Fetch user row with the stored encrypted password
    const query = `SELECT * FROM pubusers`;
    // const result = await executeQuery(query, [username]); // ✅ Prevent SQL injection
    const result = await executeQuery(query);
    // if (result.length === 0) {
    //   return NextResponse.json({ message: "User not found" }, { status: 404 });
    // }
    return NextResponse.json(result, {status: 200 })
    // Compare entered password directly with the encrypted password
    // if (password === userData.PassWord) {
    //   return NextResponse.json({
    //     message: "Login successful",
    //     user: userData, // ✅ Returning full user info for session handling
    //   }, { status: 200 });}
    //  else {
    //   return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    // }
  } catch (error) {
    console.error("Error during authentication:", error);
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}
