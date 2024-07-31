import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

async function verifyToken(token) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return !!payload;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function middleware(request) {
  const tokenCookie = request.cookies.get("token");
  // If the token cookie does not exist, redirect to the login page
  if (!tokenCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // get token from cookie
  const token = tokenCookie.value;

  // Verify the token
  const isValidToken = await verifyToken(token);

  // If the token is invalid, redirect to the login page
  if (!isValidToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the token is valid, proceed with the request
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/dashboard/:path*",
};
