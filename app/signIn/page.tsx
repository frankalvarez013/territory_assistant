"use client";
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
