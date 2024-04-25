import { useSession } from "next-auth/react";
import fetchAddUser from "@/app/components/fetch/fetchAddUser";
import { useState } from "react";

export default function AddUsers() {
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault(); // This prevents the form from submitting traditionally
    console.log("should invoke...");
    const result = await fetchAddUser(name, email, password, session?.user?.congID);
    if (result) {
      // Refresh the page to reflect changes or reset the state globally
      window.location.reload();
    } else {
      // Optional: Handle error scenario, possibly showing an error message
      console.log(result); // Display an error message if something goes wrong
    }
  };
  return (
    <form onSubmit={handleSubmit}>
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
      <button className="border-2 border-black rounded-3xl px-3" type="submit">
        Submit
      </button>
    </form>
  );
}
