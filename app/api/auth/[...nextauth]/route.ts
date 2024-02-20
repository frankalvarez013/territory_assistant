import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import NextAuth, { type NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {compare} from 'bcrypt'
const prisma = new PrismaClient();
export const authOptions:NextAuthOptions= {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'Sign In',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com'
        },
        password: {label: 'Password', type: 'password'}
      },
      async authorize(credentials){
        if (!credentials?.email || !credentials.password){
          return null //null tells auth that there is an invalid credential sent by user (not an error, just straight up not correct or there)
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })
        if (!user){
          return null
        }
        const isPasswordValid = await compare(credentials.password, user.password)
        if (!isPasswordValid){
          return null
        }
        return {
          id: user.id + '',
          email: user.email,
          name:user.name
        }
        // const user = { id: '1', name: 'ethan', email: 'test@test.com'}
        // return user
      }
    })
  ]
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}