import { useSession } from "next-auth/react";
import fetchAddUser from "@/app/components/fetch/fetchAddUser";
import { useState } from "react";

export default function AddUsers() {
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          className="block border-2 border-black"
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        ></input>
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          className="block border-2 border-black"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        ></input>
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          className="block border-2 border-black"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        ></input>
      </div>
      <button
        className="border-2 border-black rounded-3xl px-3"
        type="submit"
        onClick={() => {
          console.log("broo");
          fetchAddUser(name, email, password, session.user.congID);
        }}
      >
        Submit
      </button>
    </form>
  );
}
