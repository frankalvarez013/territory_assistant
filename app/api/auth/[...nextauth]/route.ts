import { PrismaClient } from "@prisma/client";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
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
          return null; //null tells auth that there is an invalid credential sent by user (not an error, just straight up not correct or there)
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user) {
          return null;
        }
        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );
        if (!isPasswordValid) {
          return null;
        }
        return {
          id: user.id + "",
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
          congID: user.congregationID,
        };
      },
    }),
  ],
  //JWT is called first (with token & user), then the callbacks
  //ORDER - auth - jwt - session
  callbacks: {
    session: ({ session, token }) => {
      // console.log("Session Callback", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          isAdmin: token.isAdmin,
          congID: token.congregationID,
        },
      };
    },
    //user is only passed in this function the first time user logs in credential
    jwt: ({ token, user }) => {
      // console.log("JWT Callback", { token, user });
      if (user) {
        const u = user as unknown as any; //user in user.randomKey is not our USER, its the one in next/auth and since we want to access randomKey, so
        //we have to cast it. We can use it as a prisma user but since we use randomkey we use 'any'
        return {
          ...token,
          id: u.id,
          isAdmin: u.isAdmin,
          congregationID: u.congID,
        };
      }
      return token;
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
