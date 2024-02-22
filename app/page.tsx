
import { getCsrfToken,signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { User } from "./users";
import { LoginButton, LogoutButton } from "./auth";
// async function signIn(username, password,token) {
//   console.log("oi",username,password,token);
//   const res = await fetch('/api/auth/callback/credentials', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       csrfToken: token,
//       username: username,
//       password: password,
//       // The name 'credentials' is default for the Credentials Provider. 
//       // If you've customized this, use your custom provider's ID instead.
//       callbackUrl: `${window.location.origin}/dashboard` // Optional: Specify where to redirect the user after successful sign in.
//     })
//   });
//   console.log("Back On Page")
//   console.log(res.status)
//   console.log(res.headers.get('Content-Type'));
//   console.log(res)
//   const data = await res.json();
//   console.log(data)
//   if (data.url) window.location.href = data.url; // Redirects the user to callbackUrl or the default URL.
//   else console.error('Failed to sign in', data.error);
// }
export default function homePage(){
  // const session = await getServerSession(authOptions)
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [token, setToken] = useState('');
  // useEffect(()=>{
  //   getCsrfToken().then((csrfToken) =>{
  //     setToken(csrfToken || '');
  //   })
  // },[])
  // async function handleSignIn(e){
  //   e.preventDefault();
  //   const result = await signIn('credentials',{
  //     username,
  //     password,
  //     callbackUrl: '/dashboard'
  //   })
  //   if(result?.error){
  //     console.error(result.error);
  //   } else {
  //     if(result?.url) window.location.href = result?.url;
  //   }
  // }
  return (

    <main className="text-2xl text h-full bg-[url('./assets/images/mountains.jpg')] bg-cover pt-20 text-fuchsia-700">
      
      <LoginButton></LoginButton>
      <LogoutButton></LogoutButton>
      {/* <form onSubmit={handleSignIn}>
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
    </form> */}
    {/* <h2>Server Session</h2>
    <pre>{JSON.stringify(session)}</pre>
    <h2>Client Call</h2>
    <User></User> */}
  
    </main>
    
  );
}
