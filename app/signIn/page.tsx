"use client";
import { getServerSession } from "next-auth";
import { useSession, getCsrfToken, signIn } from "next-auth/react";
import { User } from "../components/users";
import { LoginButton, LogoutButton } from "../components/auth";
import SignInForm from "./SignInForm";
import HomepageLayout from "../components/Layout/HomepageLayout";
export default function SignInPage() {
  return (
    <HomepageLayout>
      <div className="flex justify-center h-full items-center">
        <SignInForm></SignInForm>
      </div>
    </HomepageLayout>
  );
}
