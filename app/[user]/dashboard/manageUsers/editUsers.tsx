"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import userImg from "../../../public/images/user.svg";
import trash from "../../../public/images/trash.svg";
import edit from "../../../public/images/edit.svg";

export default function EditUsers() {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    async function duv() {
      const resUsers = await fetch("/api/user");
      if (!resUsers.ok) {
        console.error("Failed to fetch user data");
        return;
      }
      const usersData = await resUsers.json();
      setUsers(usersData);
    }
    duv();
  }, []);
  if (!users) {
    return <h1>...Checking</h1>;
  }
  return (
    <div className="flex flex-col gap-10 mt-10">
      {users.map((user, index) => (
        <div key={index} className="flex items-center justify-between">
          <Image
            src={userImg}
            alt="User Symbol"
            className="inline mr-5"
            height={50}
          ></Image>
          <h1 className="inline w-full">{user.name}</h1>
          <div className="w-28">
            <Image
              src={edit}
              alt="User Symbol"
              className="inline mr-5"
              height={25}
            ></Image>
            <Image
              src={trash}
              alt="User Symbol"
              className="inline"
              height={25}
            ></Image>
          </div>
        </div>
      ))}
    </div>
  );
}
