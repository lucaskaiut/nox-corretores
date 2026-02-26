import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "@/lib/auth";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export async function POST(request: Request) {
  const { token } = (await request.json()) as { token?: string };

  if (!token || typeof token !== "string") {
    return NextResponse.json(
      { error: "Token inválido" },
      { status: 400 }
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });

  return response;
}
