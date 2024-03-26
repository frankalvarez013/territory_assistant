"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import userImg from "../../../public/images/user.svg";
import trash from "../../../public/images/trash.svg";
import edit from "../../../public/images/edit.svg";
import EditUserModal from "./editUserModal";
import DeleteUserModal from "./deleteUserModal";
export default function EditUsers() {
  const [users, setUsers] = useState(null);
  const [congregations, setcongregations] = useState(null);
  const [user, setUser] = useState(false);
  const [isEditOpen, setisEditOpen] = useState(false);
  const [isDeleteOpen, setisDeleteOpen] = useState(false);

  useEffect(() => {
    async function duv() {
      const resUsers = await fetch("/api/user");
      if (!resUsers.ok) {
        console.error("Failed to fetch user data");
        return;
      }
      const usersData = await resUsers.json();
      setUsers(usersData);
      setUser(usersData[0]);
      const res = await fetch(`/api/congregation`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res1 = await res.json();
      setcongregations(res1);
    }
    duv();
  }, []);
  if (!users || !congregations) {
    return <h1>...Checking</h1>;
  }
  return (
    <div className="flex flex-col gap-10 mt-10">
      {users.map((user, index) => (
        <div key={index} className="flex">
          <button
            onClick={() => {
              setisEditOpen(true);
              setUser(user);
            }}
            key={index}
            className="flex flex-grow items-center justify-center"
          >
            <Image
              src={userImg}
              alt="User Symbol"
              className="inline"
              height={50}
            ></Image>
            <h1 className="inline w-full text-start mx-5">{user.name}</h1>
            <div className="inline mr-5">
              <Image
                src={edit}
                alt="User Symbol"
                className="inline"
                height={25}
              ></Image>
            </div>
          </button>
          <button className="inline">
            {" "}
            <Image
              src={trash}
              alt="User Symbol"
              className=" m-auto inline"
              height={25}
              onClick={() => {
                setUser(user);
                setisDeleteOpen(true);
              }}
            ></Image>
          </button>
        </div>
      ))}
      <EditUserModal
        user={user}
        isOpen={isEditOpen}
        setIsOpen={setisEditOpen}
        congregations={congregations}
      ></EditUserModal>
      <DeleteUserModal
        user={user}
        isOpen={isDeleteOpen}
        setIsOpen={setisDeleteOpen}
      ></DeleteUserModal>
    </div>
  );
}
