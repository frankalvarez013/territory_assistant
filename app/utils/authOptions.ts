import { PrismaClient } from "@prisma/client";
import NextAuth, { Awaitable, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { CustomSession } from "@/app/types/api";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("authorizing...");
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user) {
          return null;
        }
        const isPasswordValid = await compare(credentials.password, user.password);
        if (!isPasswordValid) {
          return null;
        }
        return {
          id: user.id + "",
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
          congID: user.congregationID,
          isGeneralAdmin: user.isGeneralAdmin,
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          isAdmin: token.isAdmin,
          congID: token.congregationID,
          isGeneralAdmin: token.isGeneralAdmin,
        },
      };
    },
    async redirect({ url, baseUrl }) {
      const response = await fetch(`${baseUrl}/api/auth/session`);
      const { user } = await response.json();
      if (user) {
        if (user.isAdmin) {
          return `${baseUrl}/admin/dashboard`;
        } else if (user.isGeneralAdmin) {
          return `${baseUrl}/gAdmin/dashboard`;
        }
        return `${baseUrl}/user/dashboard`;
      }
      return `${baseUrl}/`;
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        console.log("api inside", u);
        return {
          ...token,
          id: u.id,
          isAdmin: u.isAdmin,
          congregationID: u.congID,
          isGeneralAdmin: u.isGeneralAdmin,
        };
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
