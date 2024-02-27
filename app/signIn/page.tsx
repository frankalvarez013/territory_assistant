'use client'
import { getServerSession } from "next-auth";
import { useSession,getCsrfToken,signIn } from "next-auth/react";
import { User } from "../users";
import { LoginButton, LogoutButton } from "../auth";
import SignInForm from "./SignInForm";
export default function SignInPage(){
  return(
    <div className="flex justify-center h-full items-center">
      <SignInForm></SignInForm>
    </div>
  )
}