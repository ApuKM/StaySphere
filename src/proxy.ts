
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./utils/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let session = null;

  console.log("Middleware running for:", pathname);

  try {
    session = await auth.api.getSession({
      headers: request.headers,
    });
  } catch (error) {
    console.error("Middleware Session Fetch Error:", error);
    session = null;
  }

  if (!session?.user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    // clear any existing token cookie when not authenticated
    const response = NextResponse.redirect(loginUrl);
    response.cookies.set("ss_token", "", { path: "/", maxAge: 0 });
    return response;
  }

  // attach session token as an httpOnly cookie so client API calls include it
  const res = NextResponse.next();
  try {
    const token = session?.session?.token;
    if (token) {
      res.cookies.set("ss_token", String(token), {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }
  } catch (e) {
    console.error("Failed to set ss_token cookie:", e);
  }

  return res;
}

export const config = {
  matcher: [
    "/items/add",
    "/items/manage",
    "/items/manage/:path*", 
  ],
};