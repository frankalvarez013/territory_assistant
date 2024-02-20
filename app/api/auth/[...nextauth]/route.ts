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
          name:user.name,
          randomKey: 'Hey'
        }
        // const user = { id: '1', name: 'ethan', email: 'test@test.com'}
        // return user
      }
    })
  ],
  //session handles creation and maangemt of jwt, and other handlers session object that is passed around andu seud whten you fetch the sesion
  // first jwt callback is called and it passes thru the token, and then the session calllbcak is called when you have to get the session and it uses that otken
  //so in order to pass something thru we have to return it from the auth function , apss it thru the jWT function and then use it in the session
  callbacks:{
    session:({session,token})=>{
      console.log('Session Callback', {session,token})
      return {
        ...session,
        user:{
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        }
      }
    },
    //user is only passed in the first time user logs in thru Oauth/ or credential
    jwt: ({ token, user}) => {
      console.log('JWT Callback', {token,user})
      if (user){
        const u = user as unknown as any //user in user.randomKey is not our USER, its the one in next/auth and since we want to access randomKey, so
        //we have to cast it. We can use it as a prisma user but since we use randomkey we use 'any'
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey
        }
      }
      return token;
    }
  }
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}