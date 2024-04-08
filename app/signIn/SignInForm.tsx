import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleSignIn(e) {
    e.preventDefault();
    console.log(email, password);
    const result = await signIn("credentials", {
      email,
      password,
    });

    if (result?.error) {
      console.error("Failed to sign in:", result.error);
    } else if (result?.url) {
      console.log("hi");
      console.log(result);
      //   window.location.href = ``; // Redirects the user to callbackUrl or the default URL.
    }
  }
  return (
    <form
      onSubmit={handleSignIn}
      className="justify-center m-5 flex flex-col p-10 h-[20rem] w-[26rem] gap-7 shadow-2xl rounded-[2rem] shadow-all-angles"
    >
      <div className="gap-3 flex flex-col">
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={email}
          className=" border-black border-[1px] mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          className=" border-black border-[1px]"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-1/2 m-0 bg-regal-blue rounded-3xl py-2 w-36 text-white"
      >
        Sign In
      </button>
    </form>
  );
}
