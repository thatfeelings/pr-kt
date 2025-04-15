import jwt from "jsonwebtoken";
import { executeQuery } from "../../../lib/db";
import { NextResponse } from "next/server";
import { serialize } from 'cookie';

const SECRET_KEY = process.env.SECRET_KEY; // ✅ Use environment variable!

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // ✅ Fetch user row with encrypted password
    const query = "SELECT * FROM pubusers WHERE username = @username";  
    const params = { username };  
    const result = await executeQuery(query, params);

    if (result.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userData = result[0];


    // ✅ Trim spaces from stored password before comparison
    userData.PassWord = userData.PassWord.trim();

    if (password === userData.PassWord) {
      // ✅ Generate JWT token with user ID
      const token = jwt.sign({ userData: userData }, SECRET_KEY, { expiresIn: "2h" });

      console.log("Generated Token:", token); // ✅ Debug token creation
      
      const cookie = serialize("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // HTTPS only in production
        maxAge: 2 * 60 * 60, // 2 hours
        path: "/",
      });

      return new NextResponse(
        JSON.stringify({
          message: "Login successful",
          token, // Token included in the response body for debugging
          user: userData,
        }),
        {
          headers: {
            "Set-Cookie": cookie,
          },
          status: 200,
        }
      );
    } else {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}
