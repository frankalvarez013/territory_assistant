import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
// Middleware to check if the user is a general admin
async function isGeneralAdmin(req) {
  const allowedMethods = ["DELETE", "PATCH", "POST", "GET"];
  if (!allowedMethods.includes(req.method)) {
    return new Response("Method not allowed", { status: 405 });
  }
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("token...", token);
  const session = await getSession({ req });
  console.log("cong sess", session);
  if (token.isGeneralAdmin) {
    return NextResponse.next();
  }
  return new Response("Unauthorized", { status: 401 });
}

// Middleware to check if the user is an admin
async function isAdmin(req) {
  const session = await getSession({ req });
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("token...", token);
  if (token.isAdmin) {
    return NextResponse.next();
  }
  return new Response("Unauthorized", { status: 401 });
}

// Middleware for general authentication
async function isAuthenticated(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("token...", token);
  const session = await getSession({ req });
  if (token.user) {
    return NextResponse.next();
  }
  return new Response("Unauthorized", { status: 401 });
}

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;
  const method = req.method;

  console.log("middleware...", { pathname, method }, req.user);
  if (
    pathname.startsWith("/api/congregation") &&
    ["POST", "PATCH", "DELETE", "GET"].includes(method)
  ) {
    const checkGeneralAdmin = await isGeneralAdmin(req);
    if (checkGeneralAdmin instanceof NextResponse) return checkGeneralAdmin;
    return new Response("Unauthorized", { status: 401 });
  }

  if (pathname.startsWith("/api/user") && ["POST", "PATCH", "DELETE"].includes(method)) {
    const adminCheck = await isAdmin(req);
    if (adminCheck instanceof NextResponse) return adminCheck;
    return new Response("Unauthorized", { status: 401 });
  }

  if (pathname.startsWith("/api/house") && ["POST", "PATCH", "DELETE"].includes(method)) {
    const checkAdminOrAuthenticated =
      method === "PATCH" ? await isAuthenticated(req) : await isAdmin(req);
    if (checkAdminOrAuthenticated instanceof NextResponse) return checkAdminOrAuthenticated;
    return new Response("Unauthorized", { status: 401 });
  }

  return NextResponse.next(); // Default response for non-configured paths
}

export const config = {
  matcher: [
    "/api/congregation/:path*",
    "/api/user/:path*",
    "/api/territory/:path*",
    "/api/house/:path*",
  ],
};
