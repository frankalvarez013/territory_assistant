'use client'
import { useState,useEffect } from "react"
import { getCsrfToken } from "next-auth/react";
async function signIn(username, password,token) {
  console.log(username,password,token);
  const res = await fetch('/api/auth/callback/credentials', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      csrfToken: token,
      username: username,
      password: password,
      // The name 'credentials' is default for the Credentials Provider. 
      // If you've customized this, use your custom provider's ID instead.
      callbackUrl: `${window.location.origin}/your-redirect-page-after-success` // Optional: Specify where to redirect the user after successful sign in.
    })
  });

  const data = await res.json();

  if (data.url) window.location.href = data.url; // Redirects the user to callbackUrl or the default URL.
  else console.error('Failed to sign in', data.error);
}
export default function SignInForm(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  useEffect(()=>{
    getCsrfToken().then((csrfToken) =>{
      setToken(csrfToken || '');
    })
  },[])
  async function handleSignIn(e){
    e.preventDefault();
    await signIn(username, password,token);
  }
  return (
    <h1 className="text-lg text-black">
      yo
      <form onSubmit={handleSignIn}>
      hi
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <button type="submit">Sign In</button>
    </form>
    </h1>
    
  );
}
