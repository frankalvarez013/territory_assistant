import { PrismaClient } from "@prisma/client";
import NextAuth, { Awaitable, type NextAuthOptions } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { CustomSession } from "@/app/types/api";
const prisma = new PrismaClient();
type yoyo =
  | ((params: { url: string; baseUrl: string; session: CustomSession }) => Awaitable<string>)
  | undefined;

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
