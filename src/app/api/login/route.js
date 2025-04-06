import { executeQuery } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // Fetch user row with the stored encrypted password
    const query = "SELECT * FROM pubusers WHERE username = @username";  
    const params = { username };  
    const result = await executeQuery(query, params);
    
    if (result.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const userData = result[0]; // ✅ Corrected reference to user data

    
    // ✅ Trim spaces from password before comparison
    userData.PassWord = userData.PassWord.trim(); 

    // Compare entered password directly with the encrypted password
    if (password === userData.PassWord) {
      return NextResponse.json({
        message: "Login successful",
        user: userData, // ✅ Returning full user info for session handling
      }, { status: 200 });}
     else {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}
