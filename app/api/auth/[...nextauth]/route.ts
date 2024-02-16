import NextAuth from "next-auth/next";
import type { NextApiRequest,NextApiResponse } from "next";

const handler = NextAuth()

export {handler as GET, handler as POST}