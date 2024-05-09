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
  // console.log("Checking isGeneralAdmin");

  if (token.isGeneralAdmin) {
    // console.log("GAdmin - Approved!");

    return NextResponse.next();
  }
  return null;
}

// Middleware to check if the user is an admin
async function isAdmin(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // console.log("checking isAdmin");
  if (token.isAdmin) {
    // console.log("Admin - Approved!");
    return NextResponse.next();
  }
  return null;
}

// Middleware for general authentication
async function isAuthenticated(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // console.log("Checking Authentication");
  const session = await getSession({ req });
  if (token.user) {
    // console.log("Authenticated - Approved!");
    return NextResponse.next();
  }
  return null;
}

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;
  const method = req.method;
  if (pathname.startsWith("/api/congregation") && ["POST", "PATCH", "DELETE"].includes(method)) {
    const checkGeneralAdmin = await isGeneralAdmin(req);
    if (checkGeneralAdmin) {
      return checkGeneralAdmin;
    }
    return new Response("Unauthorized", { status: 401 });
  }

  if (pathname.startsWith("/api/user") && ["POST", "PATCH", "DELETE"].includes(method)) {
    const checkGeneralAdmin = await isGeneralAdmin(req);
    const adminCheck = checkGeneralAdmin ? checkGeneralAdmin : await isAdmin(req);
    if (adminCheck) {
      return adminCheck;
    }
    return new Response("Unauthorized", { status: 401 });
  }

  if (pathname.startsWith("/api/house") && ["POST", "DELETE"].includes(method)) {
    const checkAdmin = await isAdmin(req);
    if (checkAdmin) {
      return checkAdmin;
    }
    return new Response("Unauthorized", { status: 401 });
  }

  if (pathname.startsWith("/api/house") && ["PATCH"].includes(method)) {
    const checkAdminOrAuthenticated =
      method === "PATCH" ? await isAdmin(req) : await isAuthenticated(req);
    if (checkAdminOrAuthenticated) {
      return checkAdminOrAuthenticated;
    }
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
