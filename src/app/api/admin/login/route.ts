import { NextResponse } from "next/server";
import { ADMIN_CREDENTIALS } from "@/data/adminCredentials";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and Password are required" },
        { status: 400 }
      );
    }

    if (
      ADMIN_CREDENTIALS.username &&
      ADMIN_CREDENTIALS.password &&
      username.trim() === ADMIN_CREDENTIALS.username &&
      password.trim() === ADMIN_CREDENTIALS.password
    ) {
      const token = Buffer.from(
        `${username}:${Date.now()}:pride_patna_marathon_auth`
      ).toString("base64");

      const response = NextResponse.json({
        success: true,
        token,
        message: "Login successful",
      });

      // Also set secure session cookie
      response.cookies.set("patna_admin_token", token, {
        httpOnly: false,
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { error: "Invalid ID or Password! Only authorized organizers can log in." },
      { status: 401 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Authentication server error" },
      { status: 500 }
    );
  }
}
